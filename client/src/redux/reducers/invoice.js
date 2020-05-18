import {
    SET_INVOICE_INIT_STATE,
    CHANGE_INVOICE_COLORS,
    UPDATE_INVOICE_PROFILE,
    UPDATE_INVOICE_COMPANY,
    UPDATE_INVOICE_ISSUE_DATE,
    UPDATE_INVOICE_DUE_DATE,
    UPDATE_INVOICE_NOTES,
    UPDATE_INVOICE_DISCOUNT,
    UPDATE_INVOICE_CURRENCY,
    UPDATE_INVOICE_TAX_RATE,
    UPDATE_INVOICE_OTHER_FEES,
} from '../actions/types';

const initialState = {
    // _id, created_at, saved_as, issue_date, due_date, notes, discount, currency, tax , fees
    bg_color: 'blue',
    text_color: 'white',
    profile: [],
    company: [],
    tasks: [],
    notes: 'Thank you for your business.',
    discount: 0,
    tax: 0,
    fees: 0,
    currency: '',
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case SET_INVOICE_INIT_STATE:
            return { ...payload };
        case CHANGE_INVOICE_COLORS:
            return { ...state, bg_color: payload[0], text_color: payload[1] };
        case UPDATE_INVOICE_PROFILE:
            return { ...state, profile: [...payload] };
        case UPDATE_INVOICE_COMPANY:
            return { ...state, company: [...payload] };
        case UPDATE_INVOICE_ISSUE_DATE:
            return { ...state, issue_date: payload };
        case UPDATE_INVOICE_DUE_DATE:
            return { ...state, due_date: payload };
        case UPDATE_INVOICE_NOTES:
            return { ...state, notes: payload };
        case UPDATE_INVOICE_DISCOUNT:
            return { ...state, discount: payload };
        case UPDATE_INVOICE_CURRENCY:
            return { ...state, currency: payload };
        case UPDATE_INVOICE_TAX_RATE:
            return { ...state, tax: payload };
        case UPDATE_INVOICE_OTHER_FEES:
            return { ...state, fees: payload };
        default:
            return state;
    }
}
