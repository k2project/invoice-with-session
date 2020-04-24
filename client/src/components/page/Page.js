import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import Nav from './Nav';
import './Page.scss';
import DesktopOnly from './DesktopOnly';
import loader from '../../imgs/icons/loader.gif';

const Page = ({ title, user, children }) => {
    let mql = window.matchMedia('(min-width: 1000px)');
    const [desktop, desktopDisplay] = useState(true);
    const getMQL = () => {
        if (mql.matches) {
            desktopDisplay(true);
        } else {
            desktopDisplay(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getMQL();
        window.addEventListener('resize', getMQL);

        return () => {
            window.removeEventListener('resize', getMQL);
        };
    }, [desktop, desktopDisplay]);
    return (
        <Fragment>
            {!user && desktop && (
                <div className='loader'>
                    <img src={loader} alt='' />
                    <p>loading...</p>
                </div>
            )}
            {!desktop && <DesktopOnly />}
            {desktop && user && (
                <Fragment>
                    <h1 className='sr-only'>{title}</h1>
                    <div className='page'>
                        <Header />
                        <div className='dashboard'>
                            <Nav />
                            <main>{children}</main>
                        </div>
                        <footer className='footer'>
                            Free online PDF Generator and CMS &copy;{' '}
                            {new Date().getFullYear()}
                        </footer>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Page.propTypes = {
    user: PropTypes.object,
};
const mapStateToProps = (state) => ({
    user: state.user,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps)(Page);
