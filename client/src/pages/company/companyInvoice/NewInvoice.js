import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setInvoiceInitState } from '../../../redux/actions/invoice';
import { updateCompanyArr } from '../../../redux/actions/companies';
import InvoiceDoc from './invoiceDoc/InvoiceDoc';
import NewInvoiceSubmit from './NewInvoiceSubmit';
import { alertUnsavedChanges } from '../../../components/form/utils/handleUnsavedChanges';
import { setNewInvoice } from './invoiceFun';

class NewInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: null,
            submited: false,
        };
        this.handleChanges = this.handleChanges.bind(this);
        this.resestInvoiceState = this.resestInvoiceState.bind(this);
        this.setAllTasksToExcluded = this.setAllTasksToExcluded.bind(this);
    }

    resestInvoiceState() {
        //on leave clear invoice permanent state
        //no changes or submit or page leave
        this.props.setInvoiceInitState({
            bg_color: localStorage.invoice_bg || 'blue',
            text_color: localStorage.invoice_txt || 'white',
            profile: [],
            company: [],
            tasks: [],
            discount: 0,
            tax: 0,
            fees: 0,
            notes: 'Thank you for your business.',
            currency: '',
        });
    }
    async setAllTasksToExcluded(tasksArr) {
        let tasks = tasksArr.map((task) => {
            task.addToInvoice = false;
            return task;
        });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            await axios.post(
                `/api/companies/task/${this.props.company._id}`,
                JSON.stringify(tasks),
                config
            );
        } catch (err) {
            console.log(err);
        }
    }
    componentDidMount() {
        //set current tabs for handling unsaved changes redirection
        this.setState({ ...this.state, tabs: window.location.search });
        let invoiceToLoad = null;
        const searchArr = window.location.search.split('&');
        if (searchArr[1]) {
            this.setState({ ...this.state, updates: true });
            //?updating=...
            //downlaoding an existing invoice
            //?download=...
            const invoice_ID = searchArr[1].slice(9);
            invoiceToLoad = this.props.company.invoices.find(
                (invoice) => invoice._id === invoice_ID
            );
        }
        if (!invoiceToLoad) {
            this.setState({ ...this.state, updates: false });
            //invoice num #
            let invoiceInitState = setNewInvoice(
                this.props.profile,
                this.props.company
            );
            //set init state for comparison on component unmounting
            this.setState({
                invoice: JSON.parse(JSON.stringify(invoiceInitState)),
            });

            //set redux state
            this.props.setInvoiceInitState(invoiceInitState);
        }

        if (invoiceToLoad) {
            //updating an existing invoice
            //set component init state
            this.setState({
                invoice: JSON.parse(JSON.stringify(invoiceToLoad)),
            });
            //set redux state
            this.props.setInvoiceInitState(invoiceToLoad);

            if (invoiceToLoad) {
                //add invoice tasks to existing tasks of the current company
                const tasksArrIncInvoiceTasks = [
                    ...invoiceToLoad.tasks,
                    ...this.props.company.tasks,
                ];
                this.props.updateCompanyArr(
                    'tasks',
                    tasksArrIncInvoiceTasks,
                    this.props.company._id
                );
            }
        }
    }
    componentWillUnmount() {
        //auth err and logout won't trigger fun
        if (this.props.session.authenticated && !this.state.submited)
            this.handleChanges();
    }
    handleChanges() {
        //TASKS CAN BE AMENDED/UPDATED IN THE FORM WITH EFECT ON COMPANY STATE BUT NOT INVOICE STATE
        //update invoice state of added tasks before comparing changes on leave
        this.props.invoice.tasks = this.props.company.tasks.filter(
            (t) => t.addToInvoice
        );

        let nonInvoiceTasks = this.props.company.tasks;
        //on updates

        if (this.state.updates) {
            const initStateTasksIds = this.state.invoice.tasks.map(
                (t) => t._id
            );
            nonInvoiceTasks = this.props.company.tasks.filter(
                (task) => !initStateTasksIds.includes(task._id)
            );
            this.props.updateCompanyArr(
                'tasks',
                nonInvoiceTasks,
                this.props.company._id
            );
        }
        const stateUpdate = () => {
            //no changes detected or chnages discharged
            this.resestInvoiceState();
            this.setAllTasksToExcluded(nonInvoiceTasks);
        };

        alertUnsavedChanges(
            this.state.invoice,
            this.props.invoice,
            `/dashboard/companies/${this.props.company._id}${this.state.tabs}`,
            stateUpdate,
            this.props.history
        );
    }
    render() {
        return (
            <section className='company-invoice'>
                <h2 className='sr-only'>Create a new invoice.</h2>
                <InvoiceDoc />
                {this.state.invoice && (
                    <NewInvoiceSubmit
                        handleSubmit={() =>
                            this.setState({ ...this.state, submited: true })
                        }
                    />
                )}
            </section>
        );
    }
}

NewInvoice.propTypes = {
    session: PropTypes.object,
    profile: PropTypes.object,
    company: PropTypes.object,
    invoice: PropTypes.object,
    updateCompanyArr: PropTypes.func,
};

const mapStateToProps = (state) => ({
    session: state.session,
    profile: state.profile,
    company: state.companies.find(
        (c) => c._id === state.session.currentCompany
    ),
    invoice: state.invoice,
});

const mapDispatchToProps = {
    setInvoiceInitState,
    updateCompanyArr,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(NewInvoice));
