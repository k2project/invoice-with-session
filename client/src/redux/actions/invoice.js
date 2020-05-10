import {
    SET_INVOICE_INIT_STATE,
    CHANGE_INVOICE_COLORS,
    UPDATE_INVOICE_PROFILE,
    UPDATE_INVOICE_COMPANY,
    UPDATE_INVOICE_ISSUE_DATE,
    UPDATE_INVOICE_DUE_DATE,
    UPDATE_INVOICE_NOTES,
    UPDATE_INVOICE_DISCOUNT,
} from './types';

export const setInvoiceInitState = (invoice) => (dispatch) => {
    dispatch({
        type: SET_INVOICE_INIT_STATE,
        payload: invoice,
    });
};
export const changeInvoiceColors = (colors) => (dispatch) => {
    dispatch({
        type: CHANGE_INVOICE_COLORS,
        payload: colors,
    });
};
export const updateInvoiceProfile = (details) => (dispatch) => {
    dispatch({
        type: UPDATE_INVOICE_PROFILE,
        payload: details,
    });
};
export const updateInvoiceCompany = (details) => (dispatch) => {
    dispatch({
        type: UPDATE_INVOICE_COMPANY,
        payload: details,
    });
};
export const updateInvoiceIssueDate = (date) => (dispatch) => {
    dispatch({
        type: UPDATE_INVOICE_ISSUE_DATE,
        payload: date,
    });
};
export const updateInvoiceDueDate = (date) => (dispatch) => {
    dispatch({
        type: UPDATE_INVOICE_DUE_DATE,
        payload: date,
    });
};
export const updateInvoiceNotes = (notes) => (dispatch) => {
    dispatch({
        type: UPDATE_INVOICE_NOTES,
        payload: notes,
    });
};
export const updateInvoiceDiscount = (discount) => (dispatch) => {
    dispatch({
        type: UPDATE_INVOICE_DISCOUNT,
        payload: discount,
    });
};
