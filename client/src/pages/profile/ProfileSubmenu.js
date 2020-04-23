import React from 'react';
import updateIcon from '../../imgs/icons/updateIcon.png';
import listIcon from '../../imgs/icons/list.png';

export default function ProfileSubmenu({ setCurrentTab }) {
    return (
        <nav aria-label="Profile's submenu" className='submenu'>
            <ul aria-label="Profile's submenu links" className='submenu__list'>
                <li className='submenu__link'>
                    <button
                        className='submenu__btn'
                        onClick={() => {
                            setCurrentTab('details');
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
                            setCurrentTab('form');
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
}
