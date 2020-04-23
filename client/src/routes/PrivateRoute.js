import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            !authenticated ? <Redirect to={'/'} /> : <Component {...props} />
        }
    />
);

PrivateRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated,
});
export default connect(mapStateToProps)(PrivateRoute);
