import axios from 'axios';
import { dialogBox } from '../../alerts/alertsFuns';
import React from 'react';
import { Redirect } from 'react-router-dom';

export const alertUnsavedChanges = async (
    initilState,
    state,
    setStateTab,
    setUpdates,
    history
) => {
    if (JSON.stringify(state) !== JSON.stringify(initilState)) {
        const targetPathname = history.location.pathname;
        history.push('/dashboard/profile');
        setStateTab('form');
        const unblockRouting = history.block();

        const msg = `You have some unsaved changes. What would you like to do?`;
        const cancelBtnText = 'Discharge changes';
        const confirmBtnText = 'Return to the form!';
        const confirmCb = () => {
            unblockRouting();
        };
        const cancelCb = () => {
            //discharge all changes and clear app changes status
            // chnages clear on reload
            window.location.replace(window.location.origin + targetPathname);
        };

        dialogBox({
            msg,
            cancelBtnText,
            confirmBtnText,
            confirmCb,
            cancelCb,
        });
    } else {
        //no chnages
        setUpdates(null);
    }
};

export const saveChangesOnLeave = async (
    initilState,
    state,
    getState,
    endSession,
    http //api call
) => {
    try {
        if (JSON.stringify(state) !== JSON.stringify(initilState)) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            await axios.post(http, JSON.stringify(state), config);
            await getState();
        }
    } catch (err) {
        if (err.response.data.msg === 'AuthError') {
            endSession('Your session has expired. Please sign back in.');
        }
    }
};
