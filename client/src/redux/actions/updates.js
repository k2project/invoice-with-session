import { SET_UPDATES } from './types';

export const setUpdates = (updates) => (dispatch) => {
    dispatch({ type: SET_UPDATES, payload: updates });
};
