import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Profile.scss';
import CustomBuiltForm from '../../components/form/forms/CustomBuiltForm';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/profile';
import { setUpdates } from '../../redux/actions/updates';
import { alertUnsavedChanges } from '../../components/form/utils/handleUnsavedChanges';

class ProfileUpdate extends Component {
    constructor(props) {
        super(props);
        this.handleChanges = this.handleChanges.bind(this);
        this.clearInitState = this.clearInitState.bind(this);
        this.updateInitStateToReduxStateOnSubmit = this.updateInitStateToReduxStateOnSubmit.bind(
            this
        );
    }
    handleChanges() {
        alertUnsavedChanges(
            this.props.initialState, //initial state
            this.props.profile.details, //redux updated state
            this.props.setUpdates,
            this.props.history
        );
    }
    updateInitStateToReduxStateOnSubmit() {
        this.props.setUpdates(this.props.profile.details);
    }
    clearInitState() {
        //on submit clear app updates
        this.props.setUpdates(null);
    }
    componentDidMount() {
        if (this.props.initialState === null)
            this.props.setUpdates(
                JSON.parse(JSON.stringify(this.props.profile.details))
            );
        window.addEventListener('beforeunload', this.props.clearInitState);
    }
    componentWillUnmount() {
        //auth err and logout won't trigger fun
        if (this.props.authenticated) this.handleChanges();
        window.removeEventListener('beforeunload', this.props.clearInitState);
    }
    render() {
        const formData = {
            details: this.props.profile.details,
            http: '/api/profile',
            url: '/dashboard/profile',
            cb: this.props.getProfile,
            updateInitStateToReduxStateOnSubmit: this
                .updateInitStateToReduxStateOnSubmit, //stops firing alertUnsavedChanges on submit
            msg: 'Your profile has been updated successfully.',
        };
        return <CustomBuiltForm data={formData} />;
    }
}

ProfileUpdate.propTypes = {
    authenticated: PropTypes.bool,
    details: PropTypes.array,
    getProfile: PropTypes.func,
    setAlert: PropTypes.func,
    setUpdates: PropTypes.func,
};
const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated,
    profile: state.profile,
    initialState: state.updates.initialState,
});
const mapDispatchToProps = {
    getProfile,
    setUpdates,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ProfileUpdate));
