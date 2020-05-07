import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setInvoiceInitState } from '../../../redux/actions/invoice';
import InvoiceDoc from './invoiceDoc/InvoiceDoc';
import NewInvoiceSubmit from './NewInvoiceSubmit';
import { alertUnsavedChanges } from '../../../components/form/utils/handleUnsavedChanges';

class NewInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: {},
        };
        this.handleChanges = this.handleChanges.bind(this);
        this.clearInitState = this.clearInitState.bind(this);
        this.updateInitStateToReduxStateOnSubmit = this.updateInitStateToReduxStateOnSubmit.bind(
            this
        );
    }
    handleChanges() {
        // alertUnsavedChanges(
        //     this.state.invoice, //initial state
        //     this.props.invoice, //redux updated state
        //     `/dashboard/companies/${this.props.company._id}?tab=invoices`,
        //     // this.props.setUpdates,
        //     this.props.history
        // );
    }
    updateInitStateToReduxStateOnSubmit() {
        // this.props.setUpdates(this.props.company.details);
    }
    clearInitState() {
        //on submit clear app updates
        // this.props.setUpdates(null);
    }
    componentDidMount() {
        let invoiceInitState;
        const searchArr = window.location.search.split('&');
        if (searchArr[1]) {
            //updating an existing invoice
            const invoiceID = searchArr[1].slice(8);
            //invoiceInitState from the invoices arr
            invoiceInitState = {
                _id: invoiceID,
            };
        } else {
            //a new invoice
            invoiceInitState = {
                color: null,
                notes: null,
                profile: this.props.profile.details,
                company: this.props.company.details,
                tasks: this.props.company.tasks,
            };
        }
        //set init state for comparison on component unmounting
        this.setState({
            invoice: JSON.parse(JSON.stringify(invoiceInitState)),
        });
        //set redux state
        this.props.setInvoiceInitState(invoiceInitState);

        // window.addEventListener('beforeunload', this.props.clearInitState);
    }
    componentWillUnmount() {
        //auth err and logout won't trigger fun
        if (this.props.authenticated) this.handleChanges();
        // window.removeEventListener('beforeunload', this.props.clearInitState);
    }
    render() {
        return (
            <section className='company-invoice'>
                <h2 className='sr-only'>Create a new invoice.</h2>
                <InvoiceDoc />
                <NewInvoiceSubmit />
            </section>
        );
    }
}

NewInvoice.propTypes = {
    authenticated: PropTypes.bool,
    profile: PropTypes.object,
    company: PropTypes.object,
    invoice: PropTypes.object,
};

const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated,
    profile: state.profile,
    company: state.companies.find(
        (c) => c._id === state.session.currentCompany
    ),
    invoice: state.invoice,
});

const mapDispatchToProps = {
    setInvoiceInitState,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(NewInvoice));
