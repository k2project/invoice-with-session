import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import CustomBuiltForm from '../../components/form/forms/CustomBuiltForm';
import { connect } from 'react-redux';
import { getProfile, updateProfileDetails } from '../../redux/actions/profile';
import infoIcon from '../../imgs/icons/infoIcon.png';

const ProfileInit = ({
    profile: { details },
    getProfile,
    updateProfileDetails,
}) => {
    const formData = {
        details,
        http: '/api/profile/',
        url: '/dashboard/profile/',
        cb: getProfile,
        msg: 'Your profile has been created successfully.',
        updateDetails: updateProfileDetails,
    };

    return (
        <Fragment>
            <div className='tile tile--info'>
                <img src={infoIcon} alt='' className='icon--md' />{' '}
                <h2>Please create your profile.</h2>
            </div>
            <CustomBuiltForm data={formData} />
        </Fragment>
    );
};

ProfileInit.propTypes = {
    profile: PropTypes.object,
    getProfile: PropTypes.func,
    updateProfileDetails: PropTypes.func,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
});
const mapDispatchToProps = {
    getProfile,
    updateProfileDetails,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileInit);
