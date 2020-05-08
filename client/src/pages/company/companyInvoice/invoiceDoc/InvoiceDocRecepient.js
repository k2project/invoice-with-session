import React, { useState, useEffect, Fragment } from 'react';
import './InvoiceDoc.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateInvoiceCompany } from '../../../../redux/actions/invoice';
import DetailsDisplayTable from '../../../../components/form/components/DetailsDisplayTable';
import companiesIcon from '../../../../imgs/icons/companiesIcon.png';
import { Calendar } from '../../../../components/calendar/Calendar';

const InvoiceDocRecepient = ({ invoice, updateInvoiceCompany }) => {
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
        await setShowCompanyDetails(true);
        //set focus on first button for screen reader users
        document.querySelector('.invoice__company-details button').focus();
    };
    const cb = (d) => {
        console.log(d);
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
                <div className='txt--right'>
                    <p>
                        <b>INVOICE #</b>
                        {invoice.saved_as}
                    </p>
                    <p>
                        <b>ISSUE DATE</b>
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
                            <b>ACCOUNT NUMBER:</b>
                            {bank_account_num.value}
                        </p>
                    )}
                    <button
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
                </div>
            </section>
            {showCompanyDetails && (
                <section className='invoice__company-details'>
                    <DetailsDisplayTable
                        details={invoice.company}
                        updateState={updateInvoiceCompany}
                    />
                    <button
                        className='close'
                        onClick={() => setShowCompanyDetails(false)}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <span>&times;</span>
                    </button>
                </section>
            )}
            <Calendar cb={cb} />
        </Fragment>
    );
};

InvoiceDocRecepient.propTypes = {
    invoice: PropTypes.object,
};
const mapStateToProps = (state) => ({
    invoice: state.invoice,
});
const mapDispatchToProps = {
    updateInvoiceCompany,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoiceDocRecepient);
