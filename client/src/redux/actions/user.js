import axios from 'axios';
import { GET_USER, AUTH_SESS } from './types';
import { endSession } from './session';

export const getCurrentUser = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('/api/user');
        //authorise session
        dispatch({ type: AUTH_SESS });
        dispatch({
            type: GET_USER,
            user: res.data,
        });
    } catch (err) {
        console.log(err);
        if (
            err.response.data.msg === 'AuthError' &&
            getState().session.authenticated
        ) {
            dispatch(
                endSession('Your session has ended. Please sign back in.')
            );
            return;
        }
    }
};
