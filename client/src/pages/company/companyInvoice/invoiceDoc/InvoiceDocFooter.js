import React, { useState, useEffect, Fragment } from 'react';
import './InvoiceDoc.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    updateInvoiceNotes,
    updateInvoiceDiscount,
    updateInvoiceCurrency,
} from '../../../../redux/actions/invoice';
import { toNumberWithCommas } from '../../../../components/form/utils/validations';
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
    useEffect(() => {
        const itemWithCurrency = tasks.find((t) => t.amount.currency);
        if (itemWithCurrency)
            updateInvoiceCurrency(itemWithCurrency.amount.currency);
    }, [tasks]);

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

    const invoice_total_num = net_total_num + tax_total_num;
    const invoice_total_str = toNumberWithCommas(invoice_total_num);

    const TXT_INIT_TEXT = 'Edit your notes here...';
    const [notes, setNotes] = useState(TXT_INIT_TEXT);
    const handle_notes_edit = (e) => {
        let notes = e.target.value;
        setNotes(notes);
        updateInvoiceNotes(notes);
    };
    const [discount, setDiscount] = useState('0');
    const handle_discount_edit = (e) => {
        let discount = e.target.value;
        setDiscount(discount);
        updateInvoiceDiscount(discount);
    };
    const edit_input = (input, stateValue) => {
        if (input === 'textarea')
            input = document.getElementById('invoice-notes');
        //move cursor to the end of text by reseting value to empty string befor setting focus on the el
        input.value = '';
        input.focus();
        input.value = stateValue;
    };

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
                    // onClick={edit_notes}
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
                    <div>
                        <span>Discount amount:</span>
                        <span>
                            <b>
                                {currency}
                                0.00
                            </b>
                        </span>
                    </div>
                    <div>
                        <span>Tax amount:</span>
                        <span>
                            <b>
                                {currency}
                                {tax_total_str}
                            </b>
                        </span>
                    </div>
                    <div>
                        <span>Other fees*:</span>
                        <span>
                            <b>{currency}0.00</b>
                        </span>
                    </div>
                    <div>
                        <span>Total:</span>
                        <span className='invoice__total-sum'>
                            {currency}
                            {invoice_total_str}
                        </span>
                    </div>
                </section>
            </section>

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
