import React from 'react';
import './Invoice.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from '../../components/page/Page';
import { getInputValueByLabel } from '../../components/form/utils/customFormQueries';
import infoIcon from '../../imgs/icons/infoIcon.png';

export const InvoiceInit = ({ companies }) => {
    return (
        <Page>
            <section className='invoice-init'>
                <div className='tile tile--info'>
                    <img src={infoIcon} alt='' className='icon--md' />
                    Select a company to start on your invoice.
                </div>
                <ul aria-label='List of companies'>
                    {companies.map((c) => (
                        <li className='tile' key={`incoieInit-list-${c._id}`}>
                            <Link to={`/dashboard/invoice/${c._id}`}>
                                {getInputValueByLabel(c.details, 'Name')}
                                <span
                                    className='incoieInit-tasks'
                                    title='Number of current tasks saved'
                                >
                                    {c.tasks.length}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className='invoice-init__link'>
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

InvoiceInit.propTypes = {};

const mapStateToProps = (state) => ({
    companies: state.companies,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceInit);
