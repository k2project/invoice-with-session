import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import InvoiceDoc from './InvoiceDoc';
import FormInput from '../../components/form/components/FormInput';

export const NewInvoice = ({ company, history }) => {
    const downloadInvoice = () => {
        const invoice = document.getElementById('invoice').innerHTML;
        const pdf = window.open();
        pdf.document.write('<html><head>');
        pdf.document.write(
            `<link rel="stylesheet" type="text/css" href="${window.location.origin}/invoice.css"/>`
        );
        pdf.document.write(
            ` <link
            href="https://fonts.googleapis.com/css?family=Audiowide|Inter:400,600&display=swap"
            rel="stylesheet"
        />`
        );
        pdf.document.write('</head><body>');
        pdf.document.write(invoice);
        pdf.document.write('</body></link>');
        pdf.document.close();
        setTimeout(function () {
            pdf.print();
        }, 100);
    };
    const [saveAs, setSaveAs] = useState(false);
    const [formData, setFormData] = useState({
        saveAs: 'new-invoice',
        errors: [],
    });
    const saveInvoice = () => {
        //save invoice state
        //clear invoice doc
        setSaveAs(false);
        history.push(`/dashboard/companies/${company._id}?tab=invoices`);
    };

    return (
        <section className='company-invoice'>
            <h2 className='sr-only'>Create a new invoice.</h2>
            <InvoiceDoc />
            {saveAs && (
                <form>
                    <FormInput
                        form={{ formData, setFormData }}
                        name='saveAs'
                        size='sm'
                    >
                        <b>Save as: </b>
                    </FormInput>
                    <button
                        className='btn btn--info btn--sibling'
                        onClick={saveInvoice}
                    >
                        {' '}
                        Save
                    </button>
                    <button className='btn' onClick={() => setSaveAs(false)}>
                        {' '}
                        Cancel
                    </button>
                </form>
            )}

            {!saveAs && (
                <button
                    className='btn btn--sibling'
                    onClick={() => setSaveAs(true)}
                >
                    Save
                </button>
            )}
            {!saveAs && (
                <button className='btn btn--info' onClick={downloadInvoice}>
                    Download*
                </button>
            )}
            <p>
                *{' '}
                <small>
                    You can either print or save the invoice in pdf format.{' '}
                    <br />
                    We recomend using Chrome broweser for the best experience.
                    On clicking this button follow your browsers specification
                    on how to handle the process.
                </small>
            </p>
        </section>
    );
};

NewInvoice.propTypes = {
    company: PropTypes.object,
};

const mapStateToProps = (state) => ({
    company: state.companies.find(
        (c) => c._id === state.session.currentCompany
    ),
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(NewInvoice));
