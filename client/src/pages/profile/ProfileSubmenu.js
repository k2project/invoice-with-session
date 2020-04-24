import React from 'react';
import PropTypes from 'prop-types';
import updateIcon from '../../imgs/icons/updateIcon.png';
import listIcon from '../../imgs/icons/list.png';
import { connect } from 'react-redux';
import { setProfileTab } from '../../redux/actions/session';

const ProfileSubmenu = ({ setProfileTab }) => {
    return (
        <nav aria-label="Profile's submenu" className='submenu'>
            <ul aria-label="Profile's submenu links" className='submenu__list'>
                <li className='submenu__link'>
                    <button
                        className='submenu__btn'
                        onClick={() => {
                            setProfileTab('details');
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
                            setProfileTab('form');
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img
                            src={updateIcon}
                            className='submenu__icon'
                            alt=''
                        />
                        Update Profile
                    </button>
                </li>
            </ul>
        </nav>
    );
};
ProfileSubmenu.propTypes = {
    setProfileTab: PropTypes.func,
};
const mapDispatchToProps = {
    setProfileTab,
};
export default connect(null, mapDispatchToProps)(ProfileSubmenu);
