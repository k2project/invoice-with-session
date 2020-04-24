import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DetailsDisplayTable from '../../components/form/components/DetailsDisplayTable';

export const ProfileDetails = ({ details }) => {
    return (
        <section>
            <h2 className='sr-only'>Profile Details.</h2>
            <DetailsDisplayTable details={details} />
        </section>
    );
};

ProfileDetails.propTypes = {
    details: PropTypes.array,
};

const mapStateToProps = (state) => ({
    details: state.profile.details,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);
