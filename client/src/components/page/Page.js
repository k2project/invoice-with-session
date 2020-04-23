import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import Nav from './Nav';
import './Page.scss';
import DesktopOnly from './DesktopOnly';

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
        getMQL();
        window.addEventListener('resize', getMQL);
    }, [desktop, desktopDisplay]);
    return (
        <Fragment>
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
