import React, { useState, useEffect, Fragment } from 'react';
import './InvoiceDoc.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    updateInvoiceNotes,
    updateInvoiceDiscount,
    updateInvoiceCurrency,
    updateInvoiceTaxRate,
    updateInvoiceOtherFees,
} from '../../../../redux/actions/invoice';
import {
    toNumberWithCommas,
    validateRateInputToObj,
    validateTaxInputValueToNum,
} from '../../../../components/form/utils/validations';
import notesIcon from '../../../../imgs/icons/notesIcon.png';
import discountIcon from '../../../../imgs/icons/discountIcon.png';
import waletIcon from '../../../../imgs/icons/waletIcon.png';

const InvoiceDocFooter = ({
    invoice,
    updateInvoiceNotes,
    updateInvoiceDiscount,
    updateInvoiceCurrency,
    updateInvoiceTaxRate,
    updateInvoiceOtherFees,
    tasks,
}) => {
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        const itemWithCurrency = tasks
            .filter((t) => t.addToInvoice)
            .find((t) => t.amount.currency);
        if (itemWithCurrency) {
            let currency = itemWithCurrency.amount.currency;
            updateInvoiceCurrency(currency);
        } else {
            updateInvoiceCurrency('');
        }
    }, [tasks]);

    const TXT_INIT_TEXT = invoice.notes || 'Thank you for your business.';
    const [notes, setNotes] = useState(TXT_INIT_TEXT);
    const handle_notes_edit = (e) => {
        let notes = e.target.value;
        setNotes(notes);
        updateInvoiceNotes(notes);
    };
    let default_discount = invoice.currency;
    default_discount += invoice.discount
        ? toNumberWithCommas(invoice.discount)
        : '0.00';
    const [discount, setDiscount] = useState(default_discount);
    const handle_discount_edit = (e) => {
        setErrors(null);
        let discount = e.target.value;
        //return {invoice.currency, numValue}
        discount = validateRateInputToObj(discount);
        if (discount) {
            //alert when discount > net total
            if (discount.numValue > net_total_num) {
                discount = 0;
                setErrors('Discount value is greater than the subtotal.');
            } else {
                discount = discount.numValue;
            }
        } else {
            // invalid input
            // e.target.value = `${invoice.currency}0.00`;
            setErrors(
                'Inavalid discount input. Please enter the value in format £100.00 !'
            );

            //disable when no items in the arr
        }
        setDiscount(discount);
        updateInvoiceDiscount(discount);
    };
    const edit_input = (input, stateValue) => {
        if (input === 'textarea')
            input = document.getElementById('invoice-notes');
        if (input === 'discount')
            input = document.getElementById('invoice-discount');
        if (input === 'fees') input = document.getElementById('invoice-fees');
        //move cursor to the end of text by reseting value to empty string befor setting focus on the el
        input.value = '';
        input.focus();
        input.value = stateValue || `${invoice.currency}0.00`;
    };
    let default_tax = invoice.tax ? invoice.tax : 0;
    const [tax, setTax] = useState(default_tax);
    const handle_tax_edit = (e) => {
        setErrors(null);
        let tax_rate = e.target.value;
        tax_rate = validateTaxInputValueToNum(tax_rate);
        if (tax_rate === null)
            setErrors(
                'Inavalid tax rate input. Please enter the value in format 0-100%.'
            );
        setTax(tax_rate);
        updateInvoiceTaxRate(tax_rate);
    };
    let default_fees = invoice.currency;
    default_fees += invoice.fees ? toNumberWithCommas(invoice.fees) : '0.00';
    const [fees, setFees] = useState(default_fees);
    const handle_fees_edit = (e) => {
        setErrors(null);
        let fees = e.target.value;
        fees = validateRateInputToObj(fees);
        if (fees === null)
            return setErrors(
                'Inavalid discount input. Please enter the value in format £100.00 !'
            );
        setFees(fees.numValue);
        updateInvoiceOtherFees(fees.numValue);
    };

    //TOTAL CALCULATION

    let net_total_num = tasks
        .filter((t) => t.addToInvoice)
        .reduce((sum, t) => {
            if (t.amount.amountNet) return sum + t.amount.amountNet;
            return sum;
        }, 0);
    const net_total_str = toNumberWithCommas(net_total_num) || '0.00';
    net_total_num = net_total_num - invoice.discount;

    const tax_total_num = net_total_num * (invoice.tax / 100);
    const tax_total_str = toNumberWithCommas(tax_total_num) || '0%';

    const invoice_total_num = net_total_num + tax_total_num + invoice.fees;
    const invoice_total_str = toNumberWithCommas(invoice_total_num);

    return (
        <Fragment>
            <section className='invoice__footer'>
                <button
                    type='button'
                    className='invoice__btn icon_iNotes'
                    title='Edit notes'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => edit_input('textarea', notes)}
                >
                    <img src={notesIcon} alt='Edit notes' />
                </button>
                <button
                    type='button'
                    className='invoice__btn icon_iDiscount'
                    title='Add discount'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => edit_input('discount', discount)}
                >
                    <img src={discountIcon} alt='Add discount' />
                </button>
                <button
                    type='button'
                    className='invoice__btn icon_iFees'
                    title='Add other fees'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => edit_input('fees', fees)}
                >
                    <img src={waletIcon} alt='Add other fees' />
                </button>

                <section className='invoice__notes'>
                    <div className='invoice__notes-display'>
                        <h3>
                            <b>Notes:</b>
                        </h3>
                        <p>{notes}</p>
                    </div>
                    <div
                        className={`bg-${invoice.bg_color}  invoice__cover`}
                    ></div>
                    <div className='invoice__notes-form'>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor='invoice-notes'>
                                <b> Notes:</b>
                            </label>
                            <textarea
                                id='invoice-notes'
                                onChange={handle_notes_edit}
                                defaultValue={TXT_INIT_TEXT}
                            ></textarea>
                        </form>
                    </div>
                </section>
                <section
                    className={`bg-${invoice.bg_color} txt-${invoice.text_color} invoice__total`}
                >
                    <h3 className='sr-only'>Net and gross amount.</h3>

                    <div>
                        <span>Subtotal:</span>
                        <span>
                            <b>
                                {invoice.currency}
                                {net_total_str}
                            </b>
                        </span>
                    </div>
                    <Fragment>
                        <div className='invoice__discount-display'>
                            <span>Discount:</span>
                            <span>
                                <b>
                                    {invoice.currency}
                                    {invoice.discount}
                                </b>
                            </span>
                        </div>
                        <form
                            className='invoice__discount-form'
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <label htmlFor='invoice-discount'>Discount:</label>
                            <input
                                type='text'
                                id='invoice-discount'
                                autoComplete='off'
                                onChange={handle_discount_edit}
                                defaultValue={default_discount}
                            />
                        </form>
                    </Fragment>

                    <div className='invoice__tax-display'>
                        <span>Tax rate:</span>
                        <span>
                            <b>{tax}%</b>
                        </span>
                    </div>
                    <form
                        className='invoice__tax-form'
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label htmlFor='invoice-tax'>Tax Rate:</label>
                        <input
                            type='text'
                            id='invoice-tax'
                            onChange={handle_tax_edit}
                            autoComplete='off'
                            defaultValue={default_tax + '%'}
                        />
                    </form>
                    {invoice.tax > 0 && (
                        <div>
                            <span>Tax Amount:</span>
                            <span>
                                <b>
                                    {invoice.currency}
                                    {tax_total_str}
                                </b>
                            </span>
                        </div>
                    )}

                    <Fragment>
                        <div className='invoice__fees-display'>
                            <span>Other*:</span>
                            <span>
                                <b>
                                    {invoice.currency}
                                    {invoice.fees}
                                </b>
                            </span>
                        </div>
                        <form
                            className='invoice__fees-form'
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <label htmlFor='invoice-fees'>Other*:</label>
                            <input
                                type='text'
                                id='invoice-fees'
                                autoComplete='off'
                                onChange={handle_fees_edit}
                                defaultValue={default_fees}
                            />
                        </form>
                    </Fragment>

                    <div>
                        <span className='sr-only'>Total:</span>
                        <span className='invoice__total-sum'>
                            {invoice.currency}
                            {invoice_total_str}
                        </span>
                    </div>
                </section>
            </section>
            {errors && (
                <div className='tile tile--err' role='alert'>
                    Error: {errors}
                </div>
            )}
            <footer>Thank you for your business!</footer>
        </Fragment>
    );
};

InvoiceDocFooter.propTypes = {
    invoice: PropTypes.object,
    tasks: PropTypes.array,
    updateInvoiceNotes: PropTypes.func,
    updateInvoiceDiscount: PropTypes.func,
    updateInvoiceCurrency: PropTypes.func,
    updateInvoiceTaxRate: PropTypes.func,
    updateInvoiceOtherFees: PropTypes.func,
};
const mapStateToProps = (state) => ({
    invoice: state.invoice,
    tasks: state.companies.find((c) => c._id === state.session.currentCompany)
        .tasks,
});
const mapDispatchToProps = {
    updateInvoiceNotes,
    updateInvoiceDiscount,
    updateInvoiceCurrency,
    updateInvoiceTaxRate,
    updateInvoiceOtherFees,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDocFooter);
