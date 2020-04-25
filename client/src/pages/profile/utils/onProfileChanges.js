import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { dialogBox } from '../../../components/alerts/alertsFuns';

export const alertUnsavedChanges = async (
    profile,
    getProfile,
    setProfileTab,
    history,
    setAlert
) => {
    try {
        const profileDB = await axios.get('/api/profile');

        if (
            JSON.stringify(profile.details) !==
            JSON.stringify(profileDB.data.details)
        ) {
            const msg = `You have some unsaved changes. What would you like to do?`;
            const cancelBtnText = 'Discharge updates';
            const confirmBtnText = 'Return to the form!';
            const cancelCb = () => {
                getProfile();
            };
            const confirmCb = () => {
                history.push('/dashboard/profile');
                setProfileTab('form');
            };
            dialogBox({
                msg,
                cancelBtnText,
                confirmBtnText,
                cancelCb,
                confirmCb,
            });
        }
    } catch (err) {
        setAlert(
            `We think you may have some unsaved changes. Unfortunately due to server error we weren't able to proceed them. Please check the last form you were working on.`,
            'danger',
            null,
            false,
            15000
        );
    }
};
