import {
    AUTH_SESS,
    END_SESS,
    SET_CURRENT_COMPANY,
    SET_CURRENT_TASK,
    LOAD_NEW_INVOICE,
} from '../actions/types';

const initialState = {
    authenticated: false,
    currentCompany: null,
    currentTask: null,
    newInvoiceLoaded: false,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case AUTH_SESS:
            return {
                ...state,
                authenticated: true,
            };
        case SET_CURRENT_COMPANY:
            return {
                ...state,
                currentCompany: payload,
            };
        case SET_CURRENT_TASK:
            return {
                ...state,
                currentTask: payload,
            };
        case LOAD_NEW_INVOICE:
            return {
                ...state,
                newInvoiceLoaded: payload,
            };
        case END_SESS:
            return {
                ...state,
                authenticated: false,
                currentCompany: null,
                currentTask: null,
                newInvoiceLoaded: false,
            };

        default:
            return state;
    }
}
