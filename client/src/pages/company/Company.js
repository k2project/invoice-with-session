import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from '../../components/page/Page';
import CompanySubmenu from './CompanySubmenu';
import CompanyUpdate from './CompanyUpdate';
import CompanyDetails from './CompanyDetails';

import './Company.scss';

export const Company = ({ companies, currentCompanyTab }) => {
    let { id } = useParams();
    let company = companies.find((c) => c._id === id);

    return (
        <Page>
            {!company && <Redirect to='/dashboard/companies' />}
            {company && (
                <Fragment>
                    <CompanySubmenu company={company} />
                    {currentCompanyTab === 'tasks' && (
                        <div className='tile'>tasks</div>
                    )}
                    {currentCompanyTab === 'invoices' && (
                        <div className='tile'>invoices</div>
                    )}
                    {currentCompanyTab === 'details' && (
                        <CompanyDetails company={company} />
                    )}
                    {currentCompanyTab === 'update' && (
                        <CompanyUpdate details={company.details} />
                    )}
                </Fragment>
            )}
        </Page>
    );
};
Company.propTypes = {
    companies: PropTypes.array,
    currentCompanyTab: PropTypes.string,
};
const mapStateToProps = (state) => ({
    companies: state.companies,
    currentCompanyTab: state.session.currentCompanyTab,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
