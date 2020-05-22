import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCompany } from '../../redux/actions/companies';
import { getInputValueByLabel } from '../../components/form/utils/customFormQueries';
import { dialogBox } from '../../components/alerts/alertsFuns';

import updateIcon from '../../imgs/icons/updateIcon.png';
import plusIcon from '../../imgs/icons/plusIcon.png';
import listIcon from '../../imgs/icons/list.png';
import deleteIcon from '../../imgs/icons/deleteIcon.png';
import tasksIcon from '../../imgs/icons/tasksIcon.png';
import invoicesIcon from '../../imgs/icons/invoicesIcon.png';

const CompanySubmenu = ({ company, deleteCompany, history }) => {
    //details | tasks |invoices | update | delete
    let companyName = getInputValueByLabel(company.details, 'Name');
    const handleDelete = (e) => {
        const msg = ` Are you sure you want to delete ${companyName}?`;
        const targetEl = e.target;
        const cancelCb = () => {
            targetEl.focus();
        };
        const confirmCb = () => {
            deleteCompany(company._id);
            history.push('/dashboard/add-company');
        };

        dialogBox({ msg, cancelCb, confirmCb, targetEl });
        document.getElementById('dialog-cancel').focus();
    };
    const handleNewInvoiceClick = () => {
        if (window.location.search.split('&').length > 1) {
            //reset form to initial state if there is an invoice being updated
            history.push(`/dashboard/companies/${company._id}?tab=invoice`);
            window.location.reload();
        }
    };

    return (
        <nav aria-label="Company's submenu" className='submenu'>
            <h2 className='company__title'>{companyName}</h2>
            <ul aria-label="Company's submenu links" className='submenu__list'>
                <li className='submenu__link'>
                    <Link
                        to={`/dashboard/companies/${company._id}?tab=tasks`}
                        className='submenu__btn'
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img src={tasksIcon} className='submenu__icon' alt='' />
                        Tasks
                    </Link>
                </li>
                <li className='submenu__link'>
                    <Link
                        to={`/dashboard/companies/${company._id}?tab=invoice`}
                        className='submenu__btn'
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleNewInvoiceClick}
                    >
                        <img src={plusIcon} className='submenu__icon' alt='' />
                        New Invoice
                    </Link>
                </li>
                <li className='submenu__link'>
                    <Link
                        to={`/dashboard/companies/${company._id}?tab=invoices`}
                        className='submenu__btn'
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img
                            src={invoicesIcon}
                            className='submenu__icon'
                            alt=''
                        />
                        Invoices
                    </Link>
                </li>
                <li className='submenu__link'>
                    <Link
                        to={`/dashboard/companies/${company._id}?tab=details`}
                        className='submenu__btn'
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img src={listIcon} className='submenu__icon' alt='' />
                        Details
                    </Link>
                </li>
                <li className='submenu__link'>
                    <Link
                        to={`/dashboard/companies/${company._id}?tab=update`}
                        className='submenu__btn'
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img
                            src={updateIcon}
                            className='submenu__icon'
                            alt=''
                        />
                        Update
                    </Link>
                </li>
                <li className='submenu__link'>
                    <button
                        className='submenu__btn'
                        onClick={handleDelete}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img
                            src={deleteIcon}
                            className='submenu__icon'
                            alt=''
                        />
                        Delete
                    </button>
                </li>
            </ul>
        </nav>
    );
};
CompanySubmenu.propTypes = {
    deleteCompany: PropTypes.func,
    company: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    company: state.companies.find(
        (c) => c._id === state.session.currentCompany
    ),
});
const mapDispatchToProps = {
    deleteCompany,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CompanySubmenu));
