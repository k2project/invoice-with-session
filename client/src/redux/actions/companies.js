import axios from 'axios';
import {
    GET_ALL_COMPANIES,
    CLEAR_COMPANIES,
    SET_CURRENT_COMPANY,
    END_SESS,
} from '../actions/types';

export const getAllCompanies = () => async (dispatch) => {
    try {
        //get profile
        const res = await axios.get('/api/companies');
        dispatch({
            type: GET_ALL_COMPANIES,
            payload: res.data,
        });
    } catch (err) {
        console.error('AUTH ERROR ON LOADING ALL COMPANIES', err);
        console.log(err);
        dispatch({ type: END_SESS });
    }
};
export const clearCompanies = () => (dispatch) => {
    dispatch({ type: CLEAR_COMPANIES });
};
export const setCurrentCompany = (company) => (dispatch) => {
    dispatch({
        type: SET_CURRENT_COMPANY,
        payload: company,
    });
};
