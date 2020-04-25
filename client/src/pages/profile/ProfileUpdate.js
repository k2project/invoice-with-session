import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Profile.scss';
import CustomBuiltForm from '../../components/form/forms/CustomBuiltForm';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/profile';
import { setAlert } from '../../redux/actions/messages';
import { setProfileTab } from '../../redux/actions/session';
import { alertUnsavedChanges } from '../../components/form/utils/handleUnsavedChanges';

const ProfileUpdate = ({
    profile,
    getProfile,
    setAlert,
    setProfileTab,
    history,
}) => {
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
        console.log(profile.details);
        return async () => {
            console.log(profile.details);
            alertUnsavedChanges(
                profile,
                getProfile,
                setProfileTab,
                '/api/profile',
                '/dashboard/profile',
                history,
                setAlert
            );
        };
    }, []);
    return <CustomBuiltForm data={formData} />;
};

ProfileUpdate.propTypes = {
    profile: PropTypes.object,
    getProfile: PropTypes.func,
    setAlert: PropTypes.func,
    setProfileTab: PropTypes.func,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
});
const mapDispatchToProps = {
    getProfile,
    setProfileTab,
    setAlert,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ProfileUpdate));
