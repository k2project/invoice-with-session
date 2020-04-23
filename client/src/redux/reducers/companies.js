import { GET_ALL_COMPANIES, CLEAR_COMPANIES } from '../actions/types';

const initialState = {
    companies: [],
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_COMPANIES:
            return {
                ...state,
                companies: payload,
            };
        case CLEAR_COMPANIES:
            return {};
        default:
            return state;
    }
}
