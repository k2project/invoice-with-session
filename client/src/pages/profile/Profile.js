import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from '../../components/page/Page';
import ProfileSubmenu from './ProfileSubmenu';
import './Profile.scss';
import CustomBuiltForm from '../../components/form/CustomBuiltForm';
import infoIcon from '../../imgs/icons/infoIcon.png';
import { getProfile } from '../../redux/actions/profile';
import { setProfileTab } from '../../redux/actions/session';

const Profile = ({
    profile: { details, createdAt, updatedAt },
    getProfile,
    currentProfileTab: currentTab = 'details',
    setProfileTab: setCurrentTab,
}) => {
    //show form on first login and until its created
    const updated = createdAt !== updatedAt;
    const formData = {
        details,
        http: '/api/profile/',
        url: '/dashboard/profile',
        cb: getProfile,
    };

    return (
        <Page title='Profile Page.'>
            {!updated && (
                <Fragment>
                    <div className='tile tile--info'>
                        <img src={infoIcon} alt='' className='icon--md' />{' '}
                        <h2>Please create your profile.</h2>
                    </div>
                    <CustomBuiltForm
                        data={{
                            ...formData,
                            msg: 'Your profile has been created successfully.',
                        }}
                    />
                </Fragment>
            )}
            {updated && <ProfileSubmenu setCurrentTab={setCurrentTab} />}
            {updated && currentTab === 'details' && (
                <div className='tile tile--md'>details</div>
            )}
            {updated && currentTab === 'form' && (
                <CustomBuiltForm
                    data={{
                        ...formData,
                        msg: 'Your profile has been updated successfully.',
                    }}
                />
            )}
        </Page>
    );
};

Profile.propTypes = {
    profile: PropTypes.object,
    getProfile: PropTypes.func,
    setProfileTab: PropTypes.func,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
    currentProfileTab: state.session.currentProfileTab,
});
const mapDispatchToProps = {
    getProfile,
    setProfileTab,
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
