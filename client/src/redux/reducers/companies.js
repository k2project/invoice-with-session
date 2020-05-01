import {
    GET_ALL_COMPANIES,
    CLEAR_COMPANIES,
    UPDATE_COMPANY,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_COMPANIES:
            return [...payload];

        case CLEAR_COMPANIES:
            return [];

        case UPDATE_COMPANY:
            const { property, arr, id } = payload;
            const companyToUpdateIndex = state.findIndex((c) => c._id === id);
            const companyToUpdate = state[companyToUpdateIndex];
            return [
                ...state.slice(0, companyToUpdateIndex),
                { ...companyToUpdate, [property]: [...arr] },
                ...state.slice(companyToUpdateIndex + 1),
            ];

        default:
            return state;
    }
}
