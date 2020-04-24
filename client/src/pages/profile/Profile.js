import React from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
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

    //save changes
    // useEffect(() => {
    //     return async () => {
    //         try {
    //             const config = {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             };
    //             const profileDB = await axios.get('/api/profile');
    //             JSON.stringify(profile) === JSON.stringify(profileDB) ||
    //                 (await axios.post(
    //                     '/api/profile',
    //                     JSON.stringify(details),
    //                     config
    //                 ));
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    // });
    return (
        <Page title='Profile Page.'>
            {!updated && <ProfileInit />}
            {updated && <ProfileSubmenu />}
            {updated && currentProfileTab === 'details' && <ProfileDetails />}
            {updated && currentProfileTab === 'form' && <ProfileUpdate />}
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
