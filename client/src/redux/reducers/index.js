import { combineReducers } from 'redux';

import session from './session';
import messages from './messages';
import user from './user';
import profile from './profile';
import companies from './companies';

export default combineReducers({
    session,
    messages,
    user,
    profile,
    companies,
});
