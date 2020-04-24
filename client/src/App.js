import React, { Fragment, useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { Provider } from 'react-redux';
import factory from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { startSession } from './redux/actions/session';

import SkipToMainContentLink from './components/others/SkipToMainContentLink';
import Alert from './components/alerts/Alert';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import AddCompany from './pages/addCompany/AddCompany';
import Company from './pages/company/Company';
import Invoice from './pages/invoice/Invoice';
import Account from './pages/account/Account';
import NotFound from './pages/NotFound';

function App() {
    const { store, persistor } = factory();

    useEffect(() => {
        store.dispatch(startSession());
    });
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Fragment>
                        <Alert />
                        <SkipToMainContentLink />
                        <Switch>
                            <PublicRoute exact path='/' component={Login} />
                            <PublicRoute
                                exact
                                path='/register'
                                component={Register}
                            />
                            <PrivateRoute
                                exact
                                path='/dashboard/profile'
                                component={Profile}
                            />
                            <PrivateRoute
                                exact
                                path='/dashboard/add-company'
                                component={AddCompany}
                            />
                            <PrivateRoute
                                exact
                                path='/dashboard/companies/:id'
                                component={Company}
                            />

                            <PrivateRoute
                                exact
                                path='/dashboard/invoice'
                                component={Invoice}
                            />
                            <PrivateRoute
                                exact
                                path='/dashboard/account'
                                component={Account}
                            />
                            <Route to='*' component={NotFound} />
                        </Switch>
                    </Fragment>
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
