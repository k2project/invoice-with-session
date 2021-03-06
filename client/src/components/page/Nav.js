import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import plusIcon from '../../imgs/icons/plusIcon.png';
import profileIcon from '../../imgs/icons/profileIcon.png';
import cogsIcon from '../../imgs/icons/cogs.png';
import helpIcon from '../../imgs/icons/helpIcon.png';
import companiesIcon from '../../imgs/icons/companiesIcon.png';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/messages';
import { setCurrentCompany } from '../../redux/actions/session';
import NavSubmenu from './NavSubmenu';
import { sortInputsByNamesAlphabeticaly } from '../form/utils/customFormQueries';

const Nav = ({
    setAlert,
    profile: { createdAt, updatedAt },
    companies,
    setCurrentCompany,
}) => {
    companies = sortInputsByNamesAlphabeticaly(companies, 'details');
    return (
        <nav aria-label='dashboard menu' className='dashboard-nav '>
            <ul
                className='dashboard-nav__list'
                aria-label='dashboard menu links'
            >
                <div className='dashboard-nav__list-main'>
                    <li>
                        <Link
                            to='/dashboard/profile?tab=details'
                            className='dashboard-nav__link tile'
                            activeClassName='dashboard__link--is-active'
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                setAlert(
                                    `Profile's settings now desplayed on the page `,
                                    'success'
                                );
                            }}
                        >
                            <img
                                src={profileIcon}
                                className='dashboard__icon'
                                alt=''
                            />
                            Profile
                        </Link>
                    </li>

                    {companies.length > 0 && (
                        <Fragment>
                            <li>
                                <Link
                                    to={`/dashboard/companies/${companies[0]._id}?tab=tasks`}
                                    className={`dashboard-nav__link tile ${
                                        /^\/dashboard\/companies/.test(
                                            window.location.pathname
                                        )
                                            ? 'dashboard__link--is-active'
                                            : ''
                                    }`}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                        setCurrentCompany(companies[0]._id);
                                        setAlert(
                                            `Submenu listing companies now open below. `,
                                            'success'
                                        );
                                    }}
                                >
                                    <img
                                        src={companiesIcon}
                                        className='dashboard__icon'
                                        alt=''
                                    />
                                    Companies
                                </Link>
                            </li>
                            <NavSubmenu />
                        </Fragment>
                    )}

                    <li>
                        <Link
                            to='/dashboard/add-company'
                            className='dashboard-nav__link tile'
                            activeClassName='dashboard__link--is-active'
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                setAlert(
                                    `Create a new company form now desplayed on the page `,
                                    'success'
                                );
                            }}
                        >
                            <img
                                src={plusIcon}
                                className='dashboard__icon'
                                alt=''
                            />
                            Add Company
                        </Link>
                    </li>

                    <li>
                        <Link
                            to='/dashboard/invoice'
                            className='dashboard-nav__link tile'
                            activeClassName='dashboard__link--is-active'
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                setAlert(
                                    `Create a new invoice form now desplayed on the page `,
                                    'success'
                                );
                            }}
                        >
                            <img
                                src={plusIcon}
                                className='dashboard__icon'
                                alt=''
                            />
                            New Invoice
                        </Link>
                    </li>
                    {/* // disables links until profile is created */}
                    {createdAt === updatedAt && (
                        <div className='disable-links'></div>
                    )}
                </div>
                <li>
                    <Link
                        to='/dashboard/account'
                        className='dashboard-nav__link tile'
                        activeClassName='dashboard__link--is-active'
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                            setAlert(
                                `Settings desplayed on the page `,
                                'success'
                            );
                        }}
                    >
                        <img
                            src={cogsIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Account
                    </Link>
                </li>
                <li>
                    <Link
                        to='/dashboard/help'
                        className='dashboard-nav__link tile'
                        activeClassName='dashboard__link--is-active'
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                            setAlert(
                                `FAQ and contact details desplayed on the page `,
                                'success'
                            );
                        }}
                    >
                        <img
                            src={helpIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Help
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
Nav.propTypes = {
    setAlert: PropTypes.func.isRequired,
    profile: PropTypes.object,
    companies: PropTypes.array,
    setCurrentCompany: PropTypes.func,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
    companies: state.companies,
});
const mapDispatchToProps = {
    setAlert,
    setCurrentCompany,
};
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
