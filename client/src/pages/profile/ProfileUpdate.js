import React, { useEffect, Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Profile.scss';
import CustomBuiltForm from '../../components/form/forms/CustomBuiltForm';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/profile';
import {
    setProfileTab,
    setSessionUpdatesStatus,
} from '../../redux/actions/session';
import { alertUnsavedChanges } from '../../components/form/utils/handleUnsavedChanges';

class ProfileUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //deep copy of the redux state on component load
            details:
                this.props.updated ||
                JSON.parse(JSON.stringify(props.profile.details)),
        };
        this.handleChanges = this.handleChanges.bind(this);
        this.updateInitStateToReduxState = this.updateInitStateToReduxState.bind(
            this
        );
    }
    handleChanges() {
        alertUnsavedChanges(
            this.state.details, //initial state
            this.props.profile.details, //redux updated state
            this.props.setProfileTab,
            this.props.setSessionUpdatesStatus,
            '/dashboard/profile',
            this.props.history
        );
    }
    updateInitStateToReduxState() {
        this.setState({ details: this.props.profile.details });
    }
    componentDidMount() {
        window.addEventListener('beforeunload', this.handleChanges);
    }
    componentWillUnmount() {
        this.handleChanges();
        window.removeEventListener('beforeunload', this.handleChanges);
    }
    render() {
        const formData = {
            details: this.props.profile.details,
            http: '/api/profile',
            url: '/dashboard/profile',
            cb: this.props.getProfile,
            updateInitStateToReduxState: this.updateInitStateToReduxState, //stops firing alertUnsavedChanges on submit
            msg: 'Your profile has been updated successfully.',
        };
        return <CustomBuiltForm data={formData} />;
    }
}

ProfileUpdate.propTypes = {
    details: PropTypes.array,
    getProfile: PropTypes.func,
    setAlert: PropTypes.func,
    setProfileTab: PropTypes.func,
    setSessionUpdatesStatus: PropTypes.func,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
    updated: state.session.updated,
});
const mapDispatchToProps = {
    getProfile,
    setProfileTab,
    setSessionUpdatesStatus,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ProfileUpdate));
