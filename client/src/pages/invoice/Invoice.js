import React from 'react';
import './Invoice.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentCompany } from '../../redux/actions/session';
import Page from '../../components/page/Page';
import {
    getInputValueByLabel,
    sortInputsByNamesAlphabeticaly,
} from '../../components/form/utils/customFormQueries';
import infoIcon from '../../imgs/icons/infoIcon.png';

export const InvoiceInit = ({ companies, setCurrentCompany }) => {
    companies = sortInputsByNamesAlphabeticaly(companies, 'details');
    return (
        <Page>
            <section className='invoice'>
                <div className='tile tile--info'>
                    <img src={infoIcon} alt='' className='icon--md' />
                    Select a company to start on your invoice.
                </div>
                <ul aria-label='List of companies'>
                    {companies.map((c) => (
                        <li className='tile' key={`incoieInit-list-${c._id}`}>
                            <Link
                                to={`/dashboard/companies/${c._id}?tab=invoice`}
                                onClick={() => setCurrentCompany(c._id)}
                            >
                                {getInputValueByLabel(c.details, 'Name')}
                                <span
                                    className='incoie-tasks'
                                    title='Current tasks'
                                >
                                    {c.tasks.length}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className='invoice__link'>
                    <p>
                        To start a new invoice you need to provide company's
                        information.
                    </p>
                    <Link to='/dashboard/add-company'>
                        Create a new company's profile now.
                    </Link>
                </div>
            </section>
        </Page>
    );
};

InvoiceInit.propTypes = {
    companies: PropTypes.array,
    setCurrentCompany: PropTypes.func,
};

const mapStateToProps = (state) => ({
    companies: state.companies,
});

const mapDispatchToProps = {
    setCurrentCompany,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceInit);
