import React from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import { useLocation, Redirect } from 'react-router-dom';
import Page from '../../components/page/Page';
import ProfileInit from './ProfileInit';
import ProfileSubmenu from './ProfileSubmenu';
import ProfileDetails from './ProfileDetails';
import ProfileUpdate from './ProfileUpdate';
import { connect } from 'react-redux';

const Profile = ({
    profile: { createdAt, updatedAt },
    currentProfileTab = 'details',
}) => {
    //show form on first login and until its created
    const updated = createdAt !== updatedAt;
    const tab = useLocation().search.slice(5);
    const tabs = ['details', 'update'];
    return (
        <Page title='Profile Page.'>
            {!updated && <ProfileInit />}
            {updated && <ProfileSubmenu />}
            {updated && !tabs.includes(tab) && (
                <Redirect to='/dashboard/profile?tab=details' />
            )}
            {updated && tab === 'details' && <ProfileDetails />}
            {updated && tab === 'update' && <ProfileUpdate />}
        </Page>
    );
};

Profile.propTypes = {
    profile: PropTypes.object,
    currentProfileTab: PropTypes.string,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
    currentProfileTab: state.session.currentProfileTab,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
