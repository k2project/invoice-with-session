import {
    SET_INVOICE_INIT_STATE,
    CHANGE_INVOICE_COLORS,
    UPDATE_INVOICE_PROFILE,
} from '../actions/types';

const initialState = {
    // _id, createdAt, savedAs,
    bg_color: 'orange',
    text_color: '#111',
    notes: null,
    profile: [],
    company: [],
    tasks: [],
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case SET_INVOICE_INIT_STATE:
            return { ...payload };
        case CHANGE_INVOICE_COLORS:
            return { ...state, bg_color: payload[0], text_color: payload[1] };
        case UPDATE_INVOICE_PROFILE:
            return { ...state, profile: [...payload] };
        default:
            return state;
    }
}
