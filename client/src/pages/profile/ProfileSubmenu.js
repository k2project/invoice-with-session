import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import updateIcon from '../../imgs/icons/updateIcon.png';
import listIcon from '../../imgs/icons/list.png';
import { connect } from 'react-redux';

const ProfileSubmenu = () => {
    return (
        <nav aria-label="Profile's submenu" className='submenu'>
            <ul aria-label="Profile's submenu links" className='submenu__list'>
                <li className='submenu__link'>
                    <Link
                        to='/dashboard/profile?tab=details'
                        className='submenu__btn'
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img src={listIcon} className='submenu__icon' alt='' />
                        Details
                    </Link>
                </li>
                <li className='submenu__link'>
                    <Link
                        to='/dashboard/profile?tab=update'
                        className='submenu__btn'
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img
                            src={updateIcon}
                            className='submenu__icon'
                            alt=''
                        />
                        Update Profile
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
ProfileSubmenu.propTypes = {};
const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(ProfileSubmenu);
