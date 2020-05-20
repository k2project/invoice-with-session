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
import { getInputValueByLabel } from '../../../components/form/utils/customFormQueries';
import {
    date_YYYY_MM,
    date_DD_MM_YYYY,
} from '../../../components/calendar/dates';
import { v4 as uuidv4 } from 'uuid';

class NewInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: null,
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

        if (this.props.session.newInvoiceLoaded) {
            //invoice num #
            let company_abbr = getInputValueByLabel(
                this.props.company.details,
                'Name'
            ).split(' ');
            if (company_abbr.length > 1 && company_abbr[1]) {
                company_abbr = company_abbr
                    .map((el) => el[0].toUpperCase())
                    .join('');
            } else {
                company_abbr = company_abbr[0].slice(0, 3).toUpperCase();
            }
            let invoices_num = '1';
            if (this.props.company.invoices)
                invoices_num = String(this.props.company.invoices.length + 1);
            while (invoices_num.length < 5) {
                invoices_num = '0' + invoices_num;
            }
            let saved_as = company_abbr + '-';
            saved_as += date_YYYY_MM(new Date()) + '-';
            saved_as += invoices_num;
            //generate due date in 14 days
            const TWO_WEEKS = 1.21e9;
            let due_date = date_DD_MM_YYYY(new Date().getTime() + TWO_WEEKS);
            //a new invoice
            let invoiceInitState = {
                _id: uuidv4(),
                created_at: new Date(),
                saved_as,
                issue_date: date_DD_MM_YYYY(new Date()),
                due_date,
                bg_color: localStorage.invoice_bg || 'blue',
                text_color: localStorage.invoice_txt || 'white',
                profile: JSON.parse(JSON.stringify(this.props.profile.details)),
                company: JSON.parse(JSON.stringify(this.props.company.details)),
                tasks: [],
                discount: 0,
                tax: 0,
                fees: 0,
                notes: 'Thank you for your business.',
                currency: '',
            };
            //set init state for comparison on component unmounting
            this.setState({
                invoice: JSON.parse(JSON.stringify(invoiceInitState)),
            });

            //set redux state
            this.props.setInvoiceInitState(invoiceInitState);
        }

        const searchArr = window.location.search.split('&');
        if (searchArr[1]) {
            //updating an existing invoice
            //?updating=...
            //downlaoding an existing invoice
            //?download=...
            const invoice_ID = searchArr[1].slice(9);
            const invoiceToLoad = this.props.company.invoices.find(
                (invoice) => invoice._id === invoice_ID
            );
            //set component init state
            this.setState({
                invoice: JSON.parse(JSON.stringify(invoiceToLoad)),
            });
            //set redux state
            this.props.setInvoiceInitState(invoiceToLoad);
            if (!invoiceToLoad)
                this.props.history.push(
                    `/dashboard/companies/${this.props.company._id}?tab=invoices`
                );
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
        if (this.props.session.authenticated) this.handleChanges();
    }
    handleChanges() {
        //TASKS CAN BE AMENDED/UPDATED IN FORM  WITH EFECT ON DB HENCE NEED TO CHECK INIT STATE AGAINST COMPANY.TASKS NOT INVOICE.TASKS!!!
        //update invoice state of added tasks before comaring changes on leave
        this.props.invoice.tasks = this.props.company.tasks.filter(
            (t) => t.addToInvoice
        );
        console.log(
            JSON.stringify(this.state.invoice) ===
                JSON.stringify(this.props.invoice)
        );
        console.log('state:', this.state.invoice, 'redux', this.props.invoice);
        //remove tasks added on update
        const initStateTasksIds = this.state.invoice.tasks.map((t) => t._id);
        const nonInvoiceTasks = this.props.company.tasks.filter(
            (task) => !initStateTasksIds.includes(task._id)
        );
        console.log(nonInvoiceTasks);
        this.props.updateCompanyArr(
            'tasks',
            nonInvoiceTasks,
            this.props.company._id
        );
        const stateUpdate = () => {
            //no changes detected
            this.resestInvoiceState();
            //if changes discarched update DB
            if (
                JSON.stringify(this.state.invoice) !==
                JSON.stringify(this.props.invoice)
            )
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
                <NewInvoiceSubmit invoiceInitState={this.state.invoice} />
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
