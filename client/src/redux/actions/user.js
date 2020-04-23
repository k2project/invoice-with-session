import axios from 'axios';
import { GET_USER, END_SESS } from './types';

export const getCurrentUser = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/user');
        dispatch({
            type: GET_USER,
            user: res.data,
        });
    } catch (err) {
        console.error('AUTH ERROR ON USER LOADING', err);
        console.log(err);
        dispatch({ type: END_SESS });
    }
};
