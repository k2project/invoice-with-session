import {
    END_SESS,
    SET_PROFILE_TAB,
    SET_COMPANY_TAB,
    REMOVE_PROFILE,
    CLEAR_COMPANIES,
    REMOVE_USER,
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
    if (err) dispatch(setAlert(err, 'danger', null, false, 10000));
    localStorage.removeItem('persist:sess');
    dispatch({ type: REMOVE_PROFILE });
    dispatch({ type: CLEAR_COMPANIES });
    dispatch({ type: REMOVE_USER });
};
export const setProfileTab = (tab) => (dispatch) => {
    dispatch({ type: SET_PROFILE_TAB, payload: tab });
};
export const setCompanyTab = (tab) => (dispatch) => {
    dispatch({ type: SET_COMPANY_TAB, payload: tab });
};
