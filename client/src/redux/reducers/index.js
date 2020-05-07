import { combineReducers } from 'redux';

import session from './session';
import updates from './updates';
import messages from './messages';
import user from './user';
import profile from './profile';
import companies from './companies';
import invoice from './invoice';

export default combineReducers({
    session,
    updates,
    messages,
    user,
    profile,
    companies,
    invoice,
});
