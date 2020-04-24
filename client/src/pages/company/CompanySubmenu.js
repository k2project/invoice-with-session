import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCompanyTab } from '../../redux/actions/session';
import { deleteCompany } from '../../redux/actions/companies';
import { getInputValueByLabel } from '../../components/form/utils/customFormQueries';
import { dialogBox } from '../../components/alerts/alertsFuns';

import updateIcon from '../../imgs/icons/updateIcon.png';
import listIcon from '../../imgs/icons/list.png';
import deleteIcon from '../../imgs/icons/deleteIcon.png';
import tasksIcon from '../../imgs/icons/tasksIcon.png';
import invoicesIcon from '../../imgs/icons/invoicesIcon.png';

const CompanySubmenu = ({ company, setCompanyTab, deleteCompany, history }) => {
    //details | tasks |invoices | update | delete
    let companyName = getInputValueByLabel(company.details, 'Name');
    const handleDelete = (e) => {
        const msg = ` delete ${companyName}`;
        const cb = () => {
            deleteCompany(company._id);
            history.push('/dashboard/add-company');
        };
        const targetEl = e.target;
        dialogBox(msg, cb, targetEl);
        document.getElementById('dialog-cancel').focus();
    };
    return (
        <nav aria-label="Company's submenu" className='submenu'>
            <h2 className='company__title'>{companyName}</h2>
            <ul aria-label="Company's submenu links" className='submenu__list'>
                <li className='submenu__link'>
                    <button
                        className='submenu__btn'
                        onClick={() => {
                            setCompanyTab('tasks');
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img src={tasksIcon} className='submenu__icon' alt='' />
                        Tasks
                    </button>
                </li>
                <li className='submenu__link'>
                    <button
                        className='submenu__btn'
                        onClick={() => {
                            setCompanyTab('invoices');
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img
                            src={invoicesIcon}
                            className='submenu__icon'
                            alt=''
                        />
                        Invoices
                    </button>
                </li>
                <li className='submenu__link'>
                    <button
                        className='submenu__btn'
                        onClick={() => {
                            setCompanyTab('details');
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img src={listIcon} className='submenu__icon' alt='' />
                        Details
                    </button>
                </li>
                <li className='submenu__link'>
                    <button
                        className='submenu__btn'
                        onClick={() => {
                            setCompanyTab('update');
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img
                            src={updateIcon}
                            className='submenu__icon'
                            alt=''
                        />
                        Update
                    </button>
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
    setCompanyTab: PropTypes.func,
    deleteCompany: PropTypes.func,
    company: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
    setCompanyTab,
    deleteCompany,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CompanySubmenu));
