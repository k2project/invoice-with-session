import {
    END_SESS,
    REMOVE_PROFILE,
    CLEAR_COMPANIES,
    REMOVE_USER,
    SET_CURRENT_COMPANY,
    SET_CURRENT_TASK,
    LOAD_NEW_INVOICE,
} from './types';
import { setAlert } from './messages';
import { getProfile } from './profile';
import { getAllCompanies } from './companies';
import { getCurrentUser } from './user';

export const startSession = () => async (dispatch) => {
    await dispatch(getAllCompanies());
    await dispatch(getProfile());
    await dispatch(getCurrentUser());
};

export const endSession = (err) => (dispatch) => {
    dispatch({ type: END_SESS });
    if (err && window.location.pathname !== '/')
        dispatch(setAlert(err, 'danger', null, false, 10000));
    localStorage.removeItem('persist:sess');
    dispatch({ type: REMOVE_PROFILE });
    dispatch({ type: CLEAR_COMPANIES });
    dispatch({ type: REMOVE_USER });
};
export const setCurrentCompany = (id) => (dispatch) => {
    dispatch({ type: SET_CURRENT_COMPANY, payload: id });
};
export const setCurrentTask = (task) => (dispatch) => {
    dispatch({ type: SET_CURRENT_TASK, payload: task });
};
export const newInvoiceLoading = () => (dispatch) => {
    dispatch({ type: LOAD_NEW_INVOICE, payload: true });
    setTimeout(() => {
        dispatch({ type: LOAD_NEW_INVOICE, payload: false });
    }, 1000);
};
