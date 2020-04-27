import { SET_UPDATES } from '../actions/types';

const initialState = {
    initialState: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case SET_UPDATES:
            return {
                ...state,
                initialState: payload,
            };

        default:
            return state;
    }
}
