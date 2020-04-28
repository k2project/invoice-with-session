import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from '../../components/page/Page';
import CompanySubmenu from './CompanySubmenu';
import CompanyUpdate from './CompanyUpdate';
import CompanyDetails from './CompanyDetails';

import './Company.scss';

export const Company = ({ companies }) => {
    let { id } = useParams();
    let company = companies.find((c) => c._id === id);

    const tab = useLocation().search.slice(5);
    const tabs = ['tasks', 'invoices', 'details', 'update'];

    return (
        <Page>
            {!company && <Redirect to='/dashboard/companies' />}
            {company && (
                <Fragment>
                    <CompanySubmenu company={company} />
                    {!tabs.includes(tab) && (
                        <Redirect
                            to={`/dashboard/companies/${companies[0]._id}?tab=tasks`}
                        />
                    )}
                    {tab === 'tasks' && <div className='tile'>tasks</div>}
                    {tab === 'invoices' && <div className='tile'>invoices</div>}
                    {tab === 'details' && <CompanyDetails company={company} />}
                    {tab === 'update' && <CompanyUpdate company={company} />}
                </Fragment>
            )}
        </Page>
    );
};
Company.propTypes = {
    companies: PropTypes.array,
};
const mapStateToProps = (state) => ({
    companies: state.companies,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
