import axios from 'axios';
import { GET_PROFILE, UPDATE_PROFILE } from './types';
import { endSession } from './session';

export const getProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        console.error('ERROR ON PROFILE LOADING', err);
        if (err.response.data.msg === 'AuthError') {
            dispatch(
                endSession('Your session has ended. Please sign back in.')
            );
            return;
        }
    }
};
export const updateProfileDetails = (details) => (dispatch) => {
    dispatch({
        type: UPDATE_PROFILE,
        payload: details,
    });
};
