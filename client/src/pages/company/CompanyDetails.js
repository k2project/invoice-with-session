import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCompanyArr } from '../../redux/actions/companies';
import { endSession } from '../../redux/actions/session';
import DetailsDisplayTable from '../../components/form/components/DetailsDisplayTable';
import { saveChangesOnLeave } from '../../components/form/utils/handleUnsavedChanges';

class CompanyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //deep copy of the redux state on component load
            details: JSON.parse(JSON.stringify(props.company.details)),
        };
        this.handleChanges = this.handleChanges.bind(this);
        this.updateCompanyDetails = this.updateCompanyDetails.bind(this);
    }
    handleChanges() {
        saveChangesOnLeave(
            this.state.details, //initial state
            this.props.company.details, //redux updated state
            this.props.endSession,
            `/api/companies/details/${this.props.company._id}`
        );
    }
    updateCompanyDetails(details) {
        this.props.updateCompanyArr('details', details, this.props.company._id);
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
                <h2 className='sr-only'>Company Details .</h2>
                <DetailsDisplayTable
                    details={this.props.company.details}
                    updateState={this.updateCompanyDetails}
                />
            </section>
        );
    }
}

CompanyDetails.propTypes = {
    company: PropTypes.object,
    updateCompanyArr: PropTypes.func,
    endSession: PropTypes.func,
};

const mapStateToProps = (state) => ({
    company: state.companies.find(
        (c) => c._id === state.session.currentCompany
    ),
});

const mapDispatchToProps = {
    updateCompanyArr,
    endSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
