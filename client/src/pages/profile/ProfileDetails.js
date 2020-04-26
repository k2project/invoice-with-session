import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile, updateProfileDetails } from '../../redux/actions/profile';
import DetailsDisplayTable from '../../components/form/components/DetailsDisplayTable';
import { saveChangesOnLeave } from '../../components/form/utils/handleUnsavedChanges';

class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //deep copy of the redux state on component load
            details: props.updates || JSON.parse(JSON.stringify(props.details)),
        };
        this.handleChanges = this.handleChanges.bind(this);
    }
    handleChanges() {
        saveChangesOnLeave(
            this.state.details, //initial state
            this.props.details, //redux updated state
            this.props.getProfile,
            '/api/profile' //api call,
        );
    }
    componentDidMount() {
        window.addEventListener('beforeunload', this.handleChanges);
    }
    componentWillUnmount() {
        this.handleChanges();
        window.removeEventListener('beforeunload', this.handleChanges);
    }
    render() {
        return (
            <section>
                <h2 className='sr-only'>Profile Details .</h2>
                <DetailsDisplayTable
                    details={this.props.details}
                    updateState={this.props.updateProfileDetails}
                />
            </section>
        );
    }
}

ProfileDetails.propTypes = {
    details: PropTypes.array,
    getProfile: PropTypes.func,
    updateProfileDetails: PropTypes.func,
};

const mapStateToProps = (state) => ({
    details: state.profile.details,
    updates: state.session.updates,
});

const mapDispatchToProps = {
    getProfile,
    updateProfileDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);
