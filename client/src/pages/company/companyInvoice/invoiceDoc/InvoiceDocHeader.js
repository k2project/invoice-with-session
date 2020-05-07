import React, { useState, useEffect, Fragment } from 'react';
import './InvoiceDoc.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import settingsIcon from '../../../../imgs/icons/cogs.png';
import updateIcon from '../../../../imgs/icons/updateIcon.png';

const InvoiceDocHeader = ({ profile }) => {
    const [settings, setSettings] = useState(false);
    const profileDetails = profile.details.map((input) => {
        if (input.label === 'Name' && input.addToInvoice) {
            return (
                <li key={input._id}>
                    <b>{input.value}</b>
                </li>
            );
        } else if (input.addToInvoice) {
            return <li key={input._id}>{input.value}</li>;
        }
    });

    return (
        <Fragment>
            {settings && (
                <section className='tile'>
                    <h3>Choose invoice color theme.</h3>
                    <button
                        className='close'
                        onClick={() => setSettings(false)}
                    >
                        &times;
                    </button>
                </section>
            )}
            <header>
                <button
                    className='icon_iSettings'
                    title='Change invoice settings'
                    onClick={() => setSettings(true)}
                >
                    <img src={settingsIcon} alt='Invoice settings' />
                </button>
                <div>
                    <h1>invoice</h1>
                </div>
                <div className='txt--right'>
                    <button
                        className='icon_iProfile'
                        title='Change Profile details'
                    >
                        <img src={updateIcon} alt='Change Profile details' />
                    </button>
                    <ul>{profileDetails}</ul>
                </div>
            </header>
        </Fragment>
    );
};

InvoiceDocHeader.propTypes = {};
const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps)(InvoiceDocHeader);
