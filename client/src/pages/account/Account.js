import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from '../../components/page/Page';
import './Account.scss';
import DeleteAccount from './DeleteAccount';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';

export const Account = () => {
    return (
        <Page>
            <ChangeEmail />
            <ChangePassword />
            <DeleteAccount />
        </Page>
    );
};

Account.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default Account;
