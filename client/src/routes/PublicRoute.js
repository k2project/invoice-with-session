import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated ? (
                    <Redirect to={'/dashboard/profile/'} />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

PublicRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated,
});
export default connect(mapStateToProps)(PublicRoute);
