import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCompanyArr } from '../../redux/actions/companies';
import { endSession } from '../../redux/actions/session';
import TasksDisplayTable from '../../components/form/components/TasksDisplayTable';
import { saveChangesOnLeave } from '../../components/form/utils/handleUnsavedChanges';

class CompanyTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //deep copy of the redux state on component load
            tasks: JSON.parse(JSON.stringify(props.company.details)),
        };
        this.handleChanges = this.handleChanges.bind(this);
        this.updateCompanyTasks = this.updateCompanyTasks.bind(this);
    }
    handleChanges() {
        // saveChangesOnLeave(
        //     this.state.tasks, //initial state
        //     this.props.company.tasks, //redux updated state
        //     this.props.endSession,
        //     `/api/companies/tasks/${this.props.company._id}`
        // );
    }
    updateCompanyTasks(tasks) {
        this.props.updateCompanyArr(tasks, this.props.company._id);
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
            <section className='company-tasks'>
                <h2 className='sr-only'>Company Tasks.</h2>
                <TasksDisplayTable
                    tasks={this.props.company.tasks}
                    // tasks={[
                    //     {
                    //         _id: 1,
                    //         description:
                    //             'first task to be very loang to fill up all the available space so that I can see how the desing look with oit. hahaha. And a bit more to see how it looks wider...',
                    //         qty: '1',
                    //         rate: '£10',
                    //         amount: '£10',
                    //         addToInvoice: true,
                    //     },
                    //     {
                    //         _id: 2,
                    //         description: '2nd task',
                    //         qty: '1',
                    //         rate: '£30',
                    //         amount: '£30',
                    //         addToInvoice: true,
                    //     },
                    // ]}
                    updateState={this.updateCompanyTasks}
                />
            </section>
        );
    }
}

CompanyTasks.propTypes = {
    company: PropTypes.object,
    updateCompanyArr: PropTypes.func,
    endSession: PropTypes.func,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    updateCompanyArr,
    endSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyTasks);
