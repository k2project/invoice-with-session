import React, { useState, useEffect, Fragment } from 'react';
import './InvoiceDoc.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    updateInvoiceCompany,
    updateInvoiceIssueDate,
    updateInvoiceDueDate,
} from '../../../../redux/actions/invoice';
import DetailsDisplayTable from '../../../../components/form/components/DetailsDisplayTable';
import companiesIcon from '../../../../imgs/icons/companiesIcon.png';
import calendarIcon from '../../../../imgs/icons/calendar.png';
import { Calendar } from '../../../../components/calendar/Calendar';

const InvoiceDocRecepient = ({
    invoice,
    updateInvoiceCompany,
    updateInvoiceIssueDate,
    updateInvoiceDueDate,
}) => {
    //display recepient details in the invoice
    const companyDetails = invoice.company.map((input) => {
        //Name displayed differently
        if (input.label === 'Name' && input.addToInvoice) {
            return (
                <p key={input._id} className='invoice__recepient-name'>
                    {input.value}
                </p>
            );
        }
        if (input.addToInvoice) {
            let cls;
            //style address differently
            if (input.label === 'Address Line 1') cls = 'invoice__address-top ';
            if (input.label === 'Postcode') cls = 'invoice__address-btm';
            return (
                <p key={input._id} className={cls}>
                    {input.value}
                </p>
            );
        }
    });
    //display profile's bank details
    const bank_name = invoice.profile.find(
        (input) => input.addToInvoice && input.label === 'Bank Name'
    );
    const bank_account_num = invoice.profile.find(
        (input) => input.addToInvoice && input.label === 'Account Number'
    );
    const bank_sort_code = invoice.profile.find(
        (input) => input.addToInvoice && input.label === 'Sort Code'
    );
    const [showCompanyDetails, setShowCompanyDetails] = useState(false);
    const open_company_details = async () => {
        if (showCompanyDetails === true) return setShowCompanyDetails(false);
        await setShowCompanyDetails(true);
        //set focus on first button for screen reader users
        document.querySelector('.invoice__company-details button').focus();
    };

    const [showIssueDateCalendar, setShowIssueDateCalendar] = useState(false);
    const [showDueDateCalendar, setShowDueDateCalendar] = useState(false);
    const open_issue_date_calendar = async (date) => {
        if (showIssueDateCalendar === true)
            return setShowIssueDateCalendar(false);
        await setShowIssueDateCalendar(true);
        //set focus on first button for screen reader users
        document
            .querySelector('.calendar__issue-date .days__list button')
            .focus();
    };
    const open_due_date_calendar = async (date) => {
        if (showDueDateCalendar === true) return setShowDueDateCalendar(false);
        await setShowDueDateCalendar(true);
        //set focus on first button for screen reader users
        document
            .querySelector('.calendar__due-date .days__list button')
            .focus();
    };

    return (
        <Fragment>
            <section className='invoice-recepient'>
                <div className='invoice-recepient__bill-to'>
                    <p>
                        <b>BILL TO:</b>
                    </p>
                    {companyDetails}
                </div>
                <div className='invoice-recepient__dates txt--right'>
                    <p>
                        <b>INVOICE #</b>
                        {invoice.saved_as}
                    </p>
                    <p>
                        <b>INVOICE DATE</b>
                        {invoice.issue_date}
                    </p>
                    <p>
                        <b>DUE DATE</b>
                        {invoice.due_date}
                    </p>
                </div>
                <div className='invoice-recepient__banking txt--right'>
                    {bank_name && (
                        <p>
                            <b>BANK NAME:</b>
                            {bank_name.value}
                        </p>
                    )}
                    {bank_sort_code && (
                        <p>
                            <b>SORT CODE:</b>
                            {bank_sort_code.value}
                        </p>
                    )}
                    {bank_account_num && (
                        <p>
                            <b>ACCOUNT No:</b>
                            {bank_account_num.value}
                        </p>
                    )}
                    <button
                        type='button'
                        className='invoice__btn'
                        title='Change Profile details'
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={open_company_details}
                    >
                        <img
                            src={companiesIcon}
                            alt='Change recepient details'
                        />
                    </button>
                    <button
                        type='button'
                        className='invoice__btn icon_issue-date'
                        title='Change issue date'
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={open_issue_date_calendar}
                    >
                        <img src={calendarIcon} alt='Change issue date' />
                    </button>
                    <button
                        type='button'
                        className='invoice__btn icon_due-date'
                        title='Change due date'
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={open_due_date_calendar}
                    >
                        <img src={calendarIcon} alt='Change due date' />
                    </button>
                </div>
            </section>
            {showCompanyDetails && (
                <section className='invoice__company-details'>
                    <DetailsDisplayTable
                        details={invoice.company}
                        updateState={updateInvoiceCompany}
                    />
                    <button
                        type='button'
                        className='close'
                        onClick={() => setShowCompanyDetails(false)}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <span>&times;</span>
                    </button>
                </section>
            )}

            <section className='invoice__calendar'>
                <div>
                    {showIssueDateCalendar && (
                        <div className='calendar__issue-date'>
                            <h3>
                                Invoice <strong>issue date</strong>.
                            </h3>
                            <Calendar
                                cb={(date) => updateInvoiceIssueDate(date)}
                            />
                            <button
                                type='button'
                                className='close'
                                onClick={() => setShowIssueDateCalendar(false)}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    {showDueDateCalendar && (
                        <div className='calendar__due-date'>
                            <h3>
                                Invoice <strong>due date</strong>.
                            </h3>
                            <Calendar
                                cb={(date) => updateInvoiceDueDate(date)}
                            />
                            <button
                                type='button'
                                className='close'
                                onClick={() => setShowDueDateCalendar(false)}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </Fragment>
    );
};

InvoiceDocRecepient.propTypes = {
    invoice: PropTypes.object,
    updateInvoiceCompany: PropTypes.func,
    updateInvoiceIssueDate: PropTypes.func,
    updateInvoiceDueDate: PropTypes.func,
};
const mapStateToProps = (state) => ({
    invoice: state.invoice,
});
const mapDispatchToProps = {
    updateInvoiceCompany,
    updateInvoiceIssueDate,
    updateInvoiceDueDate,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoiceDocRecepient);
