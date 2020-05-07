import { SET_INVOICE_INIT_STATE, CHANGE_INVOICE_COLORS } from './types';

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
