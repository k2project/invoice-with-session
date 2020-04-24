import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { dialogBox } from '../../../components/alerts/alertsFuns';

export const alertUnsavedChanges = async (
    profile,
    getProfile,
    setProfileTab,
    history
) => {
    try {
        const profileDB = await axios.get('/api/profile');
        console.log(profile);
        console.log(profileDB);
        if (
            JSON.stringify(profile.details) !==
            JSON.stringify(profileDB.data.details)
        ) {
            const msg = `You have some unsaved changes in your profile form.`;
            const cancelBtnText = 'Leave without saving';
            const confirmBtnText = 'Return to form!';
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
        console.log('@@@ Unsaved Changes - Profile @@@', err);
    }
};
