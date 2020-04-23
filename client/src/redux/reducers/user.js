import { GET_USER, REMOVE_USER } from '../actions/types';

const initialState = null;

export default function (state = initialState, { type, user }) {
    switch (type) {
        case GET_USER:
            return user;
        case REMOVE_USER:
            return null;
        default:
            return state;
    }
}
