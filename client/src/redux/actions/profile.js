import axios from 'axios';
import { GET_PROFILE, END_SESS, UPDATE_PROFILE } from './types';
import { setAlert } from './messages';

export const getProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        console.error('ERROR ON PROFILE LOADING', err);
        console.log(err);
        // dispatch(
        //     setAlert(
        //         "We are sorry, but an error's occurred while we tried to load your profile's details.",
        //         'danger',
        //         null,
        //         false,
        //         15000
        //     )
        // );
    }
};
export const updateProfileDetails = (details) => (dispatch) => {
    dispatch({
        type: UPDATE_PROFILE,
        payload: details,
    });
};
