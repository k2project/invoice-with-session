import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from '../../components/page/Page';
import CompanySubmenu from './CompanySubmenu';
import CompanyUpdate from './CompanyUpdate';

import './Company.scss';

export const Company = ({ companies, currentCompanyTab }) => {
    let { id } = useParams();
    let company = companies.find((c) => c._id === id);
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <Page>
            {!company && <Redirect to='dashboard/companies' />}
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
                        <div className='tile'>details</div>
                    )}
                    {currentCompanyTab === 'update' && (
                        <CompanyUpdate company={company} />
                    )}
                </Fragment>
            )}
        </Page>
    );
};
Company.propTypes = {
    companies: PropTypes.array,
    currentCompanyTab: PropTypes.string,
    setCurrentCompany: PropTypes.func,
};
const mapStateToProps = (state) => ({
    companies: state.companies.companies,
    currentCompanyTab: state.session.currentCompanyTab,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
