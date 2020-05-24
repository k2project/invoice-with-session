import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/messages';
import { updateCompanyArr } from '../../redux/actions/companies';
import { getInputValueByLabel } from '../../components/form/utils/customFormQueries';
import infoIcon from '../../imgs/icons/infoIcon.png';
import updateIcon from '../../imgs/icons/updateIcon.png';
import deleteIcon from '../../imgs/icons/deleteIcon.png';
import downloadIcon from '../../imgs/icons/downloadIcon.png';
import { date_DD_MM_YYYY } from '../../components/calendar/dates';

export const CompanyInvoices = ({ company, setAlert, updateCompanyArr }) => {
    const { invoices } = company;
    let companyName = getInputValueByLabel(company.details, 'Name');
    const deleteInvocie = async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            await axios.put(
                `/api/companies/invoice/${company._id}`,
                JSON.stringify({ id }),
                config
            );
            let arr = company.invoices.filter((invoice) => invoice._id !== id);
            updateCompanyArr('invoices', arr, company._id);
            setAlert(
                'Invoice has been deleted successfully.',
                'success',
                null,
                false
            );
        } catch (err) {
            setAlert(
                "We are sorry, but couldn't delete the invoice.",
                'danger',
                null,
                false
            );
        }
    };
    return (
        <section className='company-invoices'>
            <h2 className='sr-only'>{`${companyName}'s Invoices .`}</h2>
            {invoices.length === 0 && (
                <span className='tile tile--info'>
                    <img src={infoIcon} alt='' className='icon--md' />
                    Currently there are no invoices saved. Add a new one now.
                </span>
            )}
            {invoices.length > 0 && (
                <table className='invoices-table'>
                    <caption>
                        <b>Current invoices list.</b>
                    </caption>
                    <thead>
                        <tr className='sr-only'>
                            <th scope='col'>Created at</th>
                            <th scope='col'>Invoice number</th>
                            <th scope='col'>Download Invoice</th>
                            <th scope='col'>Update Invoice</th>
                            <th scope='col'>Delete Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice, index) => (
                            <tr key={invoice._id} className='tile'>
                                <td className='invoices-date'>
                                    {date_DD_MM_YYYY(invoice.created_at)}
                                </td>
                                <th scope='row'>{invoice.saved_as}</th>
                                <td>
                                    <Link
                                        to={`/dashboard/companies/${company._id}?tab=invoice&download=${invoice._id}`}
                                        className='btn-icon'
                                        title='Download invoice'
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        <img
                                            src={downloadIcon}
                                            alt='Download Invoice'
                                        />
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        to={`/dashboard/companies/${company._id}?tab=invoice&updating=${invoice._id}`}
                                        className='btn-icon'
                                        title='Update invoice'
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        <img
                                            src={updateIcon}
                                            alt='Update Invoice'
                                        />
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className='btn-icon'
                                        title='Delete invoice'
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={(e) => {
                                            deleteInvocie(invoice._id);
                                        }}
                                    >
                                        <img
                                            src={deleteIcon}
                                            alt='Delete Invoice'
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

CompanyInvoices.propTypes = {
    company: PropTypes.object,
    setAlert: PropTypes.func,
    updateCompanyArr: PropTypes.func,
};

const mapStateToProps = (state) => ({
    company: state.companies.find(
        (c) => c._id === state.session.currentCompany
    ),
});

const mapDispatchToProps = {
    setAlert,
    updateCompanyArr,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInvoices);
