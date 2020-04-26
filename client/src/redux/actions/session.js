import {
    START_SESS,
    END_SESS,
    SET_PROFILE_TAB,
    SET_COMPANY_TAB,
    REMOVE_PROFILE,
    CLEAR_COMPANIES,
    REMOVE_USER,
    SESS_UPDATES,
} from './types';

import { getProfile } from './profile';
import { getAllCompanies } from './companies';
import { getCurrentUser } from './user';

export const startSession = () => async (dispatch) => {
    dispatch({ type: START_SESS });
    await dispatch(getAllCompanies());
    await dispatch(getProfile());
    await dispatch(getCurrentUser());
};

export const endSession = () => (dispatch) => {
    localStorage.removeItem('persist:sess');
    dispatch({ type: END_SESS });
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
export const setSessionUpdatesStatus = (updates) => (dispatch) => {
    dispatch({ type: SESS_UPDATES, payload: updates });
};
