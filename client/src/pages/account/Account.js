import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from '../../components/page/Page';
import './Account.scss';
import DeleteAccount from './DeleteAccount';

export const Account = () => {
    return (
        <Page>
            <DeleteAccount />
        </Page>
    );
};

Account.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default Account;
