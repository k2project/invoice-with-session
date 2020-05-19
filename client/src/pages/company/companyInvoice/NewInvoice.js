import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        this.clearInitState = this.clearInitState.bind(this);
        this.updateInitStateToReduxStateOnSubmit = this.updateInitStateToReduxStateOnSubmit.bind(
            this
        );
    }

    updateInitStateToReduxStateOnSubmit() {
        // this.props.setUpdates(this.props.company.details);
    }
    clearInitState() {
        //on submit clear app updates
        // this.props.setUpdates(null);
    }
    componentDidMount() {
        //set current tabs for handling unsaved changes redirection
        this.setState({ ...this.state, tabs: window.location.search });
        let invoiceInitState;
        if (this.props.session.newInvoiceLoaded) {
            //set all tasks to be excluded from invoice on load of a new invoice
            const noTasksIncluded = this.props.company.tasks.map(
                (t) => (t.addToInvoice = false)
            );
            updateCompanyArr('tasks', noTasksIncluded, this.props.company._id);
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
            invoiceInitState = {
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
            if (invoiceToLoad) {
                //invoiceInitState from the invoices arr
                invoiceInitState = invoiceToLoad;
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
        console.log(
            JSON.stringify(this.state.invoice) ===
                JSON.stringify(this.props.invoice)
        );
        this.props.invoice.tasks = this.props.company.tasks.filter(
            (t) => t.addToInvoice
        );
        console.log(this.state.invoice, this.props.invoice);

        alertUnsavedChanges(
            this.state.invoice,
            this.props.invoice,
            `/dashboard/companies/${this.props.company._id}${this.state.tabs}`,
            null,
            this.props.history
        );
        // if (
        //     JSON.stringify(this.state.invoice) !==
        //     JSON.stringify(this.props.invoice)
        // ) {
        //     const msg = `You have some unsaved changes. What would you like to do?`;
        //     const cancelBtnText = 'Discharge changes';
        //     const confirmBtnText = 'Return to the form!';
        //     const confirmCb = () => {};
        //     const cancelCb = async () => {};
        //     dialogBox({
        //         msg,
        //         cancelBtnText,
        //         confirmBtnText,
        //         confirmCb,
        //         cancelCb,
        //     });
        // } else {
        //     //remove any tasks added on update
        //     const tasksWithoutInvocieTasks = this.props.company.tasks.filter(
        //         (el) => !this.state.invoice.tasks.includes(el)
        //     );
        //     console.log(tasksWithoutInvocieTasks);
        //     this.props.updateCompanyArr(
        //         'tasks',
        //         tasksWithoutInvocieTasks,
        //         this.props.company._id
        //     );
        // }
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
