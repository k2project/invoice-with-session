import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentCompany } from '../../redux/actions/session';
import Page from '../../components/page/Page';
import CompanySubmenu from './CompanySubmenu';
import CompanyUpdate from './CompanyUpdate';
import CompanyDetails from './CompanyDetails';
import CompanyTasks from './CompanyTasks';
import NewInvoice from './companyInvoice/NewInvoice';

import './Company.scss';

export const Company = ({ companies, setCurrentCompany }) => {
    let { id } = useParams();
    let company = companies.find((c) => c._id === id);
    setCurrentCompany(id);

    useEffect(() => {
        return () => {
            setCurrentCompany(null);
        };
    }, []);

    const searchArr = useLocation().search.split('&');
    const tab = searchArr[0].slice(5);
    const tabs = ['tasks', 'invoice', 'invoices', 'details', 'update'];

    return (
        <Page>
            {!company && <Redirect to='/dashboard/companies' />}
            {company && (
                <Fragment>
                    <CompanySubmenu />
                    {!tabs.includes(tab) && (
                        <Redirect
                            to={`/dashboard/companies/${companies[0]._id}?tab=tasks`}
                        />
                    )}
                    {tab === 'tasks' && <CompanyTasks />}
                    {tab === 'invoice' && <NewInvoice />}
                    {/* <Link
                        to={`/dashboard/companies/${company._id}?tab=invoice&invoice=327h2gds7gdb83`}
                        className='submenu__btn'
                        onMouseDown={(e) => e.preventDefault()}
                    /> */}
                    {tab === 'invoices' && <div className='tile'>invoices</div>}
                    {tab === 'details' && <CompanyDetails />}
                    {tab === 'update' && <CompanyUpdate />}
                </Fragment>
            )}
        </Page>
    );
};
Company.propTypes = {
    setCurrentCompany: PropTypes.func,
};
const mapStateToProps = (state) => ({
    companies: state.companies,
});

const mapDispatchToProps = {
    setCurrentCompany,
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
