import axios from 'axios';
import { dialogBox } from '../../alerts/alertsFuns';

export const alertUnsavedChanges = async (
    initilState,
    state,
    currentPathname,
    setUpdates,
    history
) => {
    if (JSON.stringify(state) !== JSON.stringify(initilState)) {
        const targetPathname = history.location.pathname;
        const targetTab = history.location.search;
        history.push(currentPathname);
        const unblockRouting = history.block();

        const msg = `You have some unsaved changes. What would you like to do?`;
        const cancelBtnText = 'Leave the page.';
        const confirmBtnText = 'Stay on the page!';
        const confirmCb = () => {
            unblockRouting();
        };

        const cancelCb = async () => {
            //discharge all changes and clear app changes status
            // changes cleared on reload
            window.location.replace(
                window.location.origin + targetPathname + targetTab
            );
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
        if (setUpdates) setUpdates(null);
    }
};

export const saveChangesOnLeave = async (
    initilState,
    state,
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
        }
    } catch (err) {
        if (err.response.data.msg === 'AuthError') {
            endSession('Your session has expired. Please sign back in.');
        }
    }
};
