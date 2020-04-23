import { GET_PROFILE, REMOVE_PROFILE } from '../actions/types';

const initialState = {};

export default function (state = initialState, { type, profile }) {
    switch (type) {
        case GET_PROFILE:
            return profile;
        case REMOVE_PROFILE:
            return {};
        default:
            return state;
    }
}
