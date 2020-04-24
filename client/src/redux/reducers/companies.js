import {
    GET_ALL_COMPANIES,
    CLEAR_COMPANIES,
    SET_CURRENT_COMPANY,
} from '../actions/types';

const initialState = {
    companies: [],
    company: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_COMPANIES:
            return {
                ...state,
                companies: payload,
            };
        case SET_CURRENT_COMPANY:
            return {
                ...state,
                company: payload,
            };
        case CLEAR_COMPANIES:
            return { companies: [], company: null };
        default:
            return state;
    }
}
