import {
    SET_ALERT,
    REMOVE_ALERT,
    SET_ERROR,
    REMOVE_ERROR,
    CLEAR_ALL_ERRORS,
} from '../actions/types';

const initialState = {
    alerts: [],
    errors: [],
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case SET_ALERT:
            return {
                ...state,
                alerts: [payload],
            };
        case REMOVE_ALERT:
            const alerts = state.alerts.filter((alert) => alert.id !== payload);
            return {
                ...state,
                alerts,
            };
        case SET_ERROR:
            return {
                ...state,
                errors: [payload],
            };
        case CLEAR_ALL_ERRORS:
            return {
                ...state,
                errors: null,
            };

        default:
            return state;
    }
}
