import axios from 'axios';
import { setAlert } from './messages';
import { endSession } from './session';
import {
    GET_ALL_COMPANIES,
    CLEAR_COMPANIES,
    SET_CURRENT_COMPANY,
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
        if (err.response.data.msg === 'AuthError') {
            dispatch(
                endSession('Your session has expired. Please sign back in.')
            );
            return;
        }
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

export const deleteCompany = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/companies/${id}`);
        await dispatch(getAllCompanies());
        dispatch(
            setAlert('Company deleted successfully.', 'success', null, false)
        );
    } catch (err) {
        console.log(err);
        console.error('ERROR ON DELETING COMPANY', err);
    }
};
