import axios from 'axios';
import { dialogBox } from '../../alerts/alertsFuns';

export const alertUnsavedChanges = async (
    initilState,
    state,
    setUpdates,
    history
) => {
    console.log(JSON.stringify(state) !== JSON.stringify(initilState));
    if (JSON.stringify(state) !== JSON.stringify(initilState)) {
        const targetPathname = history.location.pathname;
        //submenu link clicked
        const targetTab = history.location.search;
        const currentPathname = history.location.pathname;
        console.log(history.location.search);
        console.log(window.location);
        history.push('/dashboard/profile?tab=update');
        const unblockRouting = history.block();

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
                    window.location.origin + targetPathname
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
        console.log(http);
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
