import React, { useState, useEffect, Fragment } from 'react';
import './InvoiceDoc.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateInvoiceNotes } from '../../../../redux/actions/invoice';
import { numberWithCommas } from '../../../../components/form/utils/validations';
import notesIcon from '../../../../imgs/icons/notesIcon.png';
import discountIcon from '../../../../imgs/icons/discountIcon.png';

const InvoiceDocFooter = ({ invoice, updateInvoiceNotes, tasks }) => {
    // const [showNotesForm, setShowNotesForm] = useState(false);
    // const open_notes_form = async () => {
    //     if (showNotesForm === true) return setShowNotesForm(false);
    //     await setShowNotesForm(true);
    //     // document.querySelector('.tasks-table tbody').focus();
    // };
    const TXT_INIT_TEXT = 'Edit your notes here...';
    const [notes, setNotes] = useState(TXT_INIT_TEXT);
    const handleNotesEdit = (e) => {
        let notes = e.target.value;
        setNotes(notes);
        updateInvoiceNotes(notes);
    };
    const edit_notes = () => {
        //move cursor to the end of text by reseting value to empty string befor setting focus on the el
        const textarea = document.getElementById('invoice-notes');
        textarea.value = '';
        textarea.focus();
        textarea.value = notes;
    };

    return (
        <Fragment>
            <section className='invoice__footer'>
                <button
                    className='invoice__btn icon_iNotes'
                    title='Edit notes'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={edit_notes}
                >
                    <img src={notesIcon} alt='Edit notes' />
                </button>
                <button
                    className='invoice__btn icon_iDiscount'
                    title='Add discount'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={edit_notes}
                >
                    <img src={discountIcon} alt='Add discount' />
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
                        <form>
                            <label for='invoice-notes'>
                                <b> Notes:</b>
                            </label>
                            <textarea
                                id='invoice-notes'
                                onChange={handleNotesEdit}
                            >
                                {TXT_INIT_TEXT}
                            </textarea>
                        </form>
                    </div>
                </section>
                <section
                    className={`bg-${invoice.bg_color} txt-${invoice.text_color} invoice__total`}
                >
                    <h3 className='sr-only'>Net and gross amount.</h3>
                    <div>Total: £0.00</div>
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
};
const mapStateToProps = (state) => ({
    invoice: state.invoice,
    tasks: state.companies.find((c) => c._id === state.session.currentCompany)
        .tasks,
});
const mapDispatchToProps = {
    updateInvoiceNotes,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDocFooter);
