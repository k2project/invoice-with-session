import { SET_INVOICE_INIT_STATE } from '../actions/types';

const initialState = {
    _id: null,
    color: null,
    notes: null,
    savedAs: null,
    createdAt: null,
    profile: [],
    company: [],
    tasks: [],
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case SET_INVOICE_INIT_STATE:
            return { ...payload };
        // case UPDATE_INVOICE:
        //     return { ...state, details: [...payload] };
        default:
            return state;
    }
}
