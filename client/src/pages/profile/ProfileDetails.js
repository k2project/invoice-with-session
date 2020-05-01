import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfileDetails } from '../../redux/actions/profile';
import { endSession } from '../../redux/actions/session';
import DetailsDisplayTable from '../../components/form/components/DetailsDisplayTable';
import { saveChangesOnLeave } from '../../components/form/utils/handleUnsavedChanges';

class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //deep copy of the redux state on component load
            details: JSON.parse(JSON.stringify(props.details)),
        };
        this.handleChanges = this.handleChanges.bind(this);
    }
    handleChanges() {
        saveChangesOnLeave(
            this.state.details, //initial state
            this.props.details, //redux updated state
            this.props.endSession,
            '/api/profile/' //api call,
        );
    }
    componentDidMount() {
        window.addEventListener('beforeunload', this.handleChanges);
    }
    componentWillUnmount() {
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
    updateProfileDetails: PropTypes.func,
    endSession: PropTypes.func,
};

const mapStateToProps = (state) => ({
    details: state.profile.details,
});

const mapDispatchToProps = {
    updateProfileDetails,
    endSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);
