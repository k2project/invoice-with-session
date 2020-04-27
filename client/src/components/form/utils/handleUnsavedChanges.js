import axios from 'axios';
import { dialogBox } from '../../alerts/alertsFuns';

export const alertUnsavedChanges = async (
    initilState,
    state,
    setStateTab,
    setUpdates,
    history
) => {
    if (JSON.stringify(state) !== JSON.stringify(initilState)) {
        // history.push('/dashboard/profile');
        setStateTab('form');
        const msg = `You have some unsaved changes. What would you like to do?`;
        const cancelBtnText = 'Discharge changes';
        const confirmBtnText = 'Return to the form!';
        const cancelCb = () => {
            //discharge all changes and clear app changes status
            setUpdates(false);
            window.location.reload();
        };

        dialogBox({
            msg,
            cancelBtnText,
            confirmBtnText,
            cancelCb,
        });
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
