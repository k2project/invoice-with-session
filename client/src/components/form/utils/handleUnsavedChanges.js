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

        console.log(targetPathname, currentPathname);

        const msg = `You have some unsaved changes. What would you like to do?`;
        const cancelBtnText = 'Discharge changes';
        const confirmBtnText = 'Return to the form!';
        const confirmCb = () => {
            unblockRouting();
        };
        const cancelCb = async () => {
            //discharge all changes and clear app changes status
            // chnages clear on reload
            if (targetPathname === currentPathname) {
                //on clicking submenu redirect to the targeted tab
                window.location.replace(
                    window.location.origin + targetPathname + targetTab
                );
            } else {
                window.location.replace(
                    window.location.origin + targetPathname + '?tab=tasks'
                );
            }
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
            // await getState();
        }
    } catch (err) {
        if (err.response.data.msg === 'AuthError') {
            endSession('Your session has expired. Please sign back in.');
        }
    }
};
