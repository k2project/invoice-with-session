import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAllCompanies } from '../../../redux/actions/companies';
import FormInput from '../../../components/form/components/FormInput';
import { setAlert } from '../../../redux/actions/messages';

export const NewInvoiceSubmit = ({
    company,
    invoice,
    getAllCompanies,
    setAlert,
    history,
}) => {
    useEffect(() => {
        const searchArr = window.location.search.split('&');
        if (searchArr[1]) {
            //downlaoding an existing invoice
            //?download=...
            const download = searchArr[1].slice(0, 8);
            const invoice = document.getElementById('invoice');
            if (download && invoice) {
                downloadInvoice();
                history.push(
                    `/dashboard/companies/${company._id}?tab=invoices`
                );
            }
        }
    });
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
    const show_form = async () => {
        await setSaveAs(true);
        document.querySelector('.form__save-as input').focus();
    };
    const [formData, setFormData] = useState({
        saveAs: invoice.saved_as,
        errors: [],
    });
    const saveInvoice = async (e) => {
        e.preventDefault();
        console.log(invoice);
        //save invoice state
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const tasksIncludedInInvoice = company.tasks.filter(
                (t) => t.addToInvoice
            );
            if (tasksIncludedInInvoice.length === 0)
                return setAlert(
                    'There is no items in the invoice to be saved. Please add a new item.',
                    'danger',
                    null,
                    false,
                    10000
                );
            invoice.tasks = tasksIncludedInInvoice;
            const tasks = company.tasks.filter((t) => !t.addToInvoice);
            await axios.post(
                `/api/companies/invoice/${company._id}`,
                JSON.stringify({ invoice, tasks }),
                config
            );
            getAllCompanies();
            setSaveAs(false);
            history.push(`/dashboard/companies/${company._id}?tab=invoices`);
        } catch (err) {
            console.log('Invoice saving err:', err);
        }
    };

    return (
        <section>
            <h3 className='sr-only'>Save or download invoice form.</h3>
            {saveAs && (
                <form className='form__save-as' onSubmit={saveInvoice}>
                    <FormInput
                        form={{ formData, setFormData }}
                        name='saveAs'
                        size='sm'
                    >
                        <b>Save as: </b>
                    </FormInput>
                    <button
                        type='submit'
                        className='btn btn--info btn--sibling'
                    >
                        {' '}
                        Save
                    </button>
                    <button
                        type='button'
                        className='btn'
                        onClick={() => setSaveAs(false)}
                    >
                        {' '}
                        Cancel
                    </button>
                </form>
            )}

            {!saveAs && (
                <button
                    type='button'
                    className='btn btn--sibling'
                    onClick={show_form}
                    id='save-as'
                >
                    Save As
                </button>
            )}
            {!saveAs && (
                <button
                    type='button'
                    className='btn btn--info'
                    onClick={downloadInvoice}
                >
                    Download*
                </button>
            )}
            <p>
                *{' '}
                <small>
                    You can either print or save the invoice in pdf format.{' '}
                    <br />
                    We recommend using Chrome browser for the best experience.
                    On clicking this button follow your browsers specification
                    on how to handle the process.
                </small>
            </p>
        </section>
    );
};

NewInvoiceSubmit.propTypes = {
    company: PropTypes.object,
    invoice: PropTypes.object,
    getAllCompanies: PropTypes.func,
    setAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
    company: state.companies.find(
        (c) => c._id === state.session.currentCompany
    ),
    invoice: state.invoice,
});

const mapDispatchToProps = {
    getAllCompanies,
    setAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(NewInvoiceSubmit));
