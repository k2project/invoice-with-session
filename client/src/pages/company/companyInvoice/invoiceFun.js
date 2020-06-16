import { getInputValueByLabel } from '../../../components/form/utils/customFormQueries';
import {
    date_YYYY_MM,
    date_DD_MM_YYYY,
} from '../../../components/calendar/dates';
import { v4 as uuidv4 } from 'uuid';

export const setNewInvoice = (profile, company) => {
    //invoice #
    let company_abbr = getInputValueByLabel(company.details, 'Name').split(' ');
    if (company_abbr.length > 1 && company_abbr[1]) {
        company_abbr = company_abbr.map((el) => el.slice(0, 1).toUpperCase());
        company_abbr = company_abbr.join('');
    } else {
        company_abbr = company_abbr[0].slice(0, 3).toUpperCase();
    }
    let invoices_num = '1';
    if (company.invoices) invoices_num = String(company.invoices.length + 1);
    while (invoices_num.length < 5) {
        invoices_num = '0' + invoices_num;
    }
    let saved_as = company_abbr + '-';
    saved_as += date_YYYY_MM(new Date()) + '-';
    saved_as += invoices_num;
    //generate due date in 14 days
    const TWO_WEEKS = 1.21e9;
    let due_date = date_DD_MM_YYYY(new Date().getTime() + TWO_WEEKS);
    //a new invoice
    return {
        _id: uuidv4(),
        created_at: new Date(),
        saved_as,
        issue_date: date_DD_MM_YYYY(new Date()),
        due_date,
        bg_color: localStorage.invoice_bg || 'blue',
        text_color: localStorage.invoice_txt || 'white',
        profile: JSON.parse(JSON.stringify(profile.details)),
        company: JSON.parse(JSON.stringify(company.details)),
        tasks: [],
        discount: 0,
        tax: 0,
        fees: 0,
        notes: 'Thank you for your business.',
        currency: '',
    };
};
