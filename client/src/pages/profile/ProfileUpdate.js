import React, { useEffect, Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Profile.scss';
import CustomBuiltForm from '../../components/form/forms/CustomBuiltForm';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/profile';
import { setProfileTab } from '../../redux/actions/session';
import { setUpdates } from '../../redux/actions/updates';
import { alertUnsavedChanges } from '../../components/form/utils/handleUnsavedChanges';

class ProfileUpdate extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     //deep copy of the redux state on component load
        //     details:
        //         this.props.updated ||
        //         JSON.parse(JSON.stringify(props.profile.details)),
        // };
        this.handleChanges = this.handleChanges.bind(this);
        this.updateInitStateToReduxState = this.updateInitStateToReduxState.bind(
            this
        );
    }
    handleChanges() {
        alertUnsavedChanges(
            this.props.initialState, //initial state
            this.props.profile.details, //redux updated state
            this.props.setProfileTab,
            this.props.setUpdates,
            this.props.history
        );
    }
    updateInitStateToReduxState() {
        this.props.setUpdates(false);
        this.setState({ details: this.props.profile.details });
    }
    componentDidMount() {
        if (this.props.initialState === null)
            this.props.setUpdates(
                JSON.parse(JSON.stringify(this.props.profile.details))
            );
        window.addEventListener('beforeunload', () =>
            this.props.setUpdates(null)
        );
    }
    componentWillUnmount() {
        console.log('Unmoutning');
        this.handleChanges();
        window.removeEventListener('beforeunload', () =>
            this.props.setUpdates(null)
        );
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
    setUpdates: PropTypes.func,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
    initialState: state.updates.initialState,
});
const mapDispatchToProps = {
    getProfile,
    setProfileTab,
    setUpdates,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ProfileUpdate));
