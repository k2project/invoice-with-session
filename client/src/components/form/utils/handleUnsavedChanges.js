import axios from 'axios';
import { dialogBox } from '../../alerts/alertsFuns';

export const alertUnsavedChanges = async (
    initilState,
    state,
    setStateTab,
    setSessionUpdatesStatus,
    url, //redirection back to the form
    history
) => {
    try {
        if (JSON.stringify(state) !== JSON.stringify(initilState)) {
            setSessionUpdatesStatus(true);
            const msg = `You have some unsaved changes. What would you like to do?`;
            const cancelBtnText = 'Discharge updates';
            const confirmBtnText = 'Return to the form!';
            const cancelCb = () => {
                setSessionUpdatesStatus(false);
                window.location.reload();
            };
            const confirmCb = () => {
                history.push(url);
                setStateTab('form');
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
        console.log(err);
        // setAlert(
        //     `We think you may have some unsaved changes. Unfortunately due to server error we weren't able to proceed them.`,
        //     'danger',
        //     null,
        //     false,
        //     15000
        // );
    }
};

export const saveChangesOnLeave = async (
    initilState,
    state,
    getState,
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
        console.log(err);
    }
};
