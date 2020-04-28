import {
    AUTH_SESS,
    END_SESS,
    SET_PROFILE_TAB,
    SET_COMPANY_TAB,
} from '../actions/types';

const initialState = {
    authenticated: false,
    currentProfileTab: 'details', //detaisl | form
    currentCompanyTab: 'tasks', //details | tasks |invoices | update | delete,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case AUTH_SESS:
            return {
                ...state,
                authenticated: true,
            };
        case END_SESS:
            return {
                ...state,
                authenticated: false,
                currentProfileTab: 'details',
                currentCompanyTab: 'tasks',
            };
        case SET_PROFILE_TAB:
            return {
                ...state,
                currentProfileTab: payload,
            };
        case SET_COMPANY_TAB:
            return {
                ...state,
                currentCompanyTab: payload,
            };

        default:
            return state;
    }
}
