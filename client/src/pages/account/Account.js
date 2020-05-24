import React from 'react';
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

export default Account;
