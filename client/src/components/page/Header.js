import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setAlert } from '../../redux/actions/messages';
import { endSession } from '../../redux/actions/session';
import { dateUX, getDateAndTimeUX } from '../../utils/dates';

export const Header = ({
    setAlert,
    endSession,
    lastLogin,
    profile: { createdAt, updatedAt },
}) => {
    const updated = createdAt !== updatedAt;
    const today = dateUX(new Date());
    const messages = [
        `Today is ${today}.`,
        `${
            updated
                ? `Welcome back! Your last login was${getDateAndTimeUX(
                      lastLogin
                  )}.`
                : 'Welcome to <b class="font-logo">invoice</b> . Please create your profile.'
        }`,

        'Happy <b class="font-logo">invoicing</b> !',
    ];
    const srMessages = messages.map((message, i) => {
        return <li key={`header-message-${i}`}>{message}</li>;
    });
    let interval;
    const runInterval = () => {
        const tile = document.querySelector('.header__messages');
        let i = 0;
        tile.innerHTML = `<span>${messages[1]}</span>`;
        interval = setInterval(() => {
            tile.innerHTML = '';
            tile.innerHTML = `<span>${messages[i]}</span>`;
            i++;
            if (i === messages.length) i = 0;
        }, 5000);
    };

    useEffect(() => {
        const tile = document.querySelector('.header__messages');
        runInterval();
        tile.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        tile.addEventListener('mouseleave', runInterval);

        return () => {
            clearInterval(interval);
            tile.removeEventListener('mouseenter', () => {
                clearInterval(interval);
            });
            tile.removeEventListener('mouseleave', runInterval);
        };
    }, []);

    const logout = async () => {
        try {
            await axios.delete('/api/user');
            setAlert(
                'You have been logged out successfully.',
                'success',
                'login page',
                false
            );
            endSession();
        } catch (err) {
            console.log('logout err', err);
        }
    };

    return (
        <header className='header'>
            <Link
                to='/dashboard/profile'
                onMouseDown={(e) => e.preventDefault()}
                className='header__logo tile'
                onClick={() => {
                    setAlert(
                        `Profile's settings have been now desplayed on the page `,
                        'success'
                    );
                }}
            >
                invoice
            </Link>
            <section className='header__messages-display'>
                <div className='sr-only'>
                    <h2>Your daily dashboard messages.</h2>
                    <ul>{srMessages}</ul>
                </div>
                <div className='header__messages tile' aria-hidden='true'></div>
            </section>
            <button
                className='header__logout tile'
                onMouseDown={(e) => e.preventDefault()}
                onClick={logout}
            >
                Sign Out
            </button>
        </header>
    );
};

Header.propTypes = {
    setAlert: PropTypes.func.isRequired,
    endSession: PropTypes.func.isRequired,
    lastLogin: PropTypes.string,
    updated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
    lastLogin: state.user.lastLogin,
    profile: state.profile,
});
const mapDispatchToProps = {
    setAlert,
    endSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
