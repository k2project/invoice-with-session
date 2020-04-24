import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Profile.scss';
import CustomBuiltForm from '../../components/form/forms/CustomBuiltForm';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/profile';
import { setProfileTab } from '../../redux/actions/session';
import { alertUnsavedChanges } from './utils/onProfileChanges';

const ProfileUpdate = ({ profile, getProfile, setProfileTab, history }) => {
    const { details } = profile;
    const formData = {
        details,
        http: '/api/profile/',
        url: '/dashboard/profile',
        cb: getProfile,
        msg: 'Your profile has been updated successfully.',
    };
    //handle unsaved changes
    useEffect(() => {
        return async () => {
            alertUnsavedChanges(profile, getProfile, setProfileTab, history);
        };
    }, []);
    return <CustomBuiltForm data={formData} />;
};

ProfileUpdate.propTypes = {
    profile: PropTypes.object,
    getProfile: PropTypes.func,
    setProfileTab: PropTypes.func,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
});
const mapDispatchToProps = {
    getProfile,
    setProfileTab,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ProfileUpdate));
