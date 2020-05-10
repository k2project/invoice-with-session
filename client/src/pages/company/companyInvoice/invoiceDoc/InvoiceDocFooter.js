import React, { useState, useEffect, Fragment } from 'react';
import './InvoiceDoc.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    updateInvoiceNotes,
    updateInvoiceDiscount,
    updateInvoiceCurrency,
} from '../../../../redux/actions/invoice';
import {
    toNumberWithCommas,
    validateRateInputToObj,
} from '../../../../components/form/utils/validations';
import notesIcon from '../../../../imgs/icons/notesIcon.png';
import discountIcon from '../../../../imgs/icons/discountIcon.png';

const InvoiceDocFooter = ({
    invoice,
    updateInvoiceNotes,
    updateInvoiceDiscount,
    updateInvoiceCurrency,
    tasks,
}) => {
    const currency = invoice.currency || '';
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        const itemWithCurrency = tasks.find((t) => t.amount.currency);
        if (itemWithCurrency)
            updateInvoiceCurrency(itemWithCurrency.amount.currency);
    }, [tasks]);

    const TXT_INIT_TEXT = 'Edit your notes here...';
    const [notes, setNotes] = useState(TXT_INIT_TEXT);
    const handle_notes_edit = (e) => {
        let notes = e.target.value;
        setNotes(notes);
        updateInvoiceNotes(notes);
    };
    const [showDiscount, setShowDiscount] = useState(false);
    const [discount, setDiscount] = useState(0);
    const show_discount = async () => {
        if (showDiscount) {
            //reset discount on hidding
            setDiscount(0);
            updateInvoiceDiscount(0);
            return setShowDiscount(false);
        }
        await setShowDiscount(true);
        edit_input('discount', discount);
    };
    const handle_discount_edit = (e) => {
        setErrors(null);
        let discount = e.target.value;
        //return {currency, numValue}
        discount = validateRateInputToObj(discount);
        if (discount) {
            console.log(discount, net_total_num);
            //alert when discount > net total
            if (discount.numValue > net_total_num) {
                discount = 0;
                setErrors('Discount value is greater than the subtotal.');
            } else {
                discount = discount.numValue;
            }
        } else {
            // invalid input
            discount = 0;
            e.target.value = `${currency}0.00`;
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
        //move cursor to the end of text by reseting value to empty string befor setting focus on the el
        input.value = '';
        input.focus();
        input.value = stateValue || `${currency}0.00`;
    };

    //TOTAL CALCULATION

    const net_total_num = tasks.reduce((sum, t) => {
        if (t.amount.amountNet) return sum + t.amount.amountNet;
        return sum;
    }, 0);
    const net_total_str = toNumberWithCommas(net_total_num) || '0.00';

    const tax_total_num = tasks.reduce((sum, t) => {
        if (t.amount.amountTaxed) return sum + t.amount.amountTaxed;
        return sum;
    }, 0);
    const tax_total_str = toNumberWithCommas(tax_total_num) || '0.00';

    let invoice_total_num = net_total_num - discount;
    invoice_total_num = invoice_total_num + tax_total_num;
    const invoice_total_str = toNumberWithCommas(invoice_total_num);

    return (
        <Fragment>
            <section className='invoice__footer'>
                <button
                    className='invoice__btn icon_iNotes'
                    title='Edit notes'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => edit_input('textarea', notes)}
                >
                    <img src={notesIcon} alt='Edit notes' />
                </button>
                <button
                    className='invoice__btn icon_iDiscount'
                    title='Edit discount'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={show_discount}
                >
                    <img src={discountIcon} alt='Edit discount' />
                </button>

                <section className='invoice__notes'>
                    <div className='invoice__notes-display'>
                        <h3>
                            <b>Notes*:</b>
                        </h3>
                        <p>{notes}</p>
                    </div>
                    <div
                        className={`bg-${invoice.bg_color}  invoice__cover`}
                    ></div>
                    <div className='invoice__notes-form'>
                        <form>
                            <label htmlFor='invoice-notes'>
                                <b> Notes*:</b>
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
                                {currency}
                                {net_total_str}
                            </b>
                        </span>
                    </div>
                    {showDiscount && (
                        <Fragment>
                            <div className='invoice__discount-display'>
                                <span>Discount:</span>
                                <span>
                                    <b>
                                        {currency}
                                        0.00
                                    </b>
                                </span>
                            </div>
                            <form className='invoice__discount-form'>
                                <label htmlFor='invoice-discount'>
                                    Discount:
                                </label>
                                <input
                                    type='text'
                                    id='invoice-discount'
                                    onChange={handle_discount_edit}
                                />
                            </form>
                        </Fragment>
                    )}
                    <div>
                        <span>Tax:</span>
                        <span>
                            <b>
                                {currency}
                                {tax_total_str}
                            </b>
                        </span>
                    </div>
                    {/* <div>
                        <span>Other fees*:</span>
                        <span>
                            <b>{currency}0.00</b>
                        </span>
                    </div> */}
                    <div>
                        <span>Total:</span>
                        <span className='invoice__total-sum'>
                            {currency}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDocFooter);
