import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomBuiltForm from '../../components/form/forms/CustomBuiltForm';
import { connect } from 'react-redux';
import { getAllCompanies } from '../../redux/actions/companies';
import { setUpdates } from '../../redux/actions/updates';
import { alertUnsavedChanges } from '../../components/form/utils/handleUnsavedChanges';

class CompanyUpdate extends Component {
    constructor(props) {
        super(props);
        this.handleChanges = this.handleChanges.bind(this);
        this.clearInitState = this.clearInitState.bind(this);
        this.updateInitStateToReduxStateOnSubmit = this.updateInitStateToReduxStateOnSubmit.bind(
            this
        );
    }
    handleChanges() {
        alertUnsavedChanges(
            this.props.initialState, //initial state
            this.props.company.details, //redux updated state
            `/dashboard/companies/${this.props.company._id}?tab=update`,
            this.props.setUpdates,
            this.props.history
        );
    }
    updateInitStateToReduxStateOnSubmit() {
        this.props.setUpdates(this.props.company.details);
    }
    clearInitState() {
        //on submit clear app updates
        this.props.setUpdates(null);
    }
    componentDidMount() {
        if (this.props.initialState === null)
            this.props.setUpdates(
                JSON.parse(JSON.stringify(this.props.company.details))
            );
        window.addEventListener('beforeunload', this.props.clearInitState);
    }
    componentWillUnmount() {
        //auth err and logout won't trigger fun
        if (this.props.authenticated) this.handleChanges();
        window.removeEventListener('beforeunload', this.props.clearInitState);
    }
    render() {
        const formData = {
            inputs: this.props.company.details,
            http: `/api/companies/details/${this.props.company._id}`,
            url: '/dashboard/companies/',
            cb: this.props.getAllCompanies,
            updateInitStateToReduxStateOnSubmit: this
                .updateInitStateToReduxStateOnSubmit, //stops firing alertUnsavedChanges on submit
            msg: 'Company has been updated successfully.',
        };
        return <CustomBuiltForm data={formData} />;
    }
}
CompanyUpdate.propTypes = {
    authenticated: PropTypes.bool,
    company: PropTypes.object.isRequired,
    getAllCompanies: PropTypes.func,
    setAlert: PropTypes.func,
    setUpdates: PropTypes.func,
};
const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated,
    initialState: state.updates.initialState,
});

const mapDispatchToProps = {
    getAllCompanies,
    setUpdates,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CompanyUpdate));
