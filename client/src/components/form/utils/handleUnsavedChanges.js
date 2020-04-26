import axios from 'axios';
import { dialogBox } from '../../alerts/alertsFuns';

export const alertUnsavedChanges = async (
    state,
    getState,
    setStateTab,
    http, //api call
    url, //redirection back to the form
    history,
    setAlert
) => {
    try {
        const stateDB = await axios.get(http);

        if (
            JSON.stringify(state.details) !==
            JSON.stringify(stateDB.data.details)
        ) {
            const msg = `You have some unsaved changes. What would you like to do?`;
            const cancelBtnText = 'Discharge updates';
            const confirmBtnText = 'Return to the form!';
            const cancelCb = () => {
                getState();
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
        setAlert(
            `We think you may have some unsaved changes. Unfortunately due to server error we weren't able to proceed them.`,
            'danger',
            null,
            false,
            15000
        );
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
