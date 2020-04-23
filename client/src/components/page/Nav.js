import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import plusIcon from '../../imgs/icons/plusIcon.png';
import profileIcon from '../../imgs/icons/profileIcon.png';
import cogsIcon from '../../imgs/icons/cogs.png';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/messages';
import Page from './Page';

const Nav = ({ setAlert }) => {
    return (
        <nav aria-label='dashboard menu' className='dashboard-nav '>
            <ul
                className='dashboard-nav__list'
                aria-label='dashboard menu links'
            >
                <div className='dashboard-nav__list-main'>
                    <li>
                        <Link
                            to='/dashboard/profile'
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

                    {/* {companies.length > 0 && <DashboardSubNav />} */}

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
                </div>
                <li>
                    <Link
                        to='/dashboard/account'
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
                            src={cogsIcon}
                            className='dashboard__icon'
                            alt=''
                        />
                        Account
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
Nav.propTypes = {
    setAlert: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    setAlert,
};
export default connect(null, mapDispatchToProps)(Nav);
