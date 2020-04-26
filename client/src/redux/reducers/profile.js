import { GET_PROFILE, REMOVE_PROFILE, UPDATE_PROFILE } from '../actions/types';

const initialState = {};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_PROFILE:
            return { ...payload };
        case UPDATE_PROFILE:
            return { ...state, details: [...payload] };

        case REMOVE_PROFILE:
            return {};
        default:
            return state;
    }
}
