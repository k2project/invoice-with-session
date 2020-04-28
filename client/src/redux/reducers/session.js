import { AUTH_SESS, END_SESS } from '../actions/types';

const initialState = {
    authenticated: false,
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

        default:
            return state;
    }
}
