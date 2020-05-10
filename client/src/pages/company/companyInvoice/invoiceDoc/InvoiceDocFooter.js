import React, { useState, useEffect, Fragment } from 'react';
import './InvoiceDoc.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskDisplayTable from '../../../../components/form/components/TasksDisplayTable';
import { numberWithCommas } from '../../../../components/form/utils/validations';
import TaskForm from '../../../../components/form/forms/TaskForm';
import plusIcon from '../../../../imgs/icons/plusIcon.png';
import updateIcon from '../../../../imgs/icons/updateIcon.png';
import tasksIcon from '../../../../imgs/icons/tasksIcon.png';

const InvoiceDocFooter = ({ invoice, tasks }) => {
    const [showNotesForm, setShowNotesForm] = useState(false);
    const open_notes_form = async () => {
        if (showNotesForm === true) return setShowNotesForm(false);
        await setShowNotesForm(true);
        // document.querySelector('.tasks-table tbody').focus();
    };

    return (
        <Fragment>
            <section className='invoice__footer'>
                <section className='invoice__notes'>
                    <div>
                        <h3>
                            <b>Notes:</b>
                        </h3>
                        You can either print or save the invoice in pdf format.
                        We recommend using Chrome broweser for the best
                        experience. On clicking this button follow your browsers
                        specification on how to handle the process.
                    </div>
                    <div
                        className={`bg-${invoice.bg_color}  invoice__cover`}
                    ></div>
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
};
const mapStateToProps = (state) => ({
    invoice: state.invoice,
    tasks: state.companies.find((c) => c._id === state.session.currentCompany)
        .tasks,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDocFooter);
