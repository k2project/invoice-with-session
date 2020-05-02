import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getAllCompanies,
    updateCompanyArr,
} from '../../redux/actions/companies';
import { endSession } from '../../redux/actions/session';
import TasksDisplayTable from '../../components/form/components/TasksDisplayTable';
import { saveChangesOnLeave } from '../../components/form/utils/handleUnsavedChanges';
import TaskForm from '../../components/form/forms/TaskForm';
import infoIcon from '../../imgs/icons/infoIcon.png';

class CompanyTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //deep copy of the redux state on component load
            tasks: JSON.parse(JSON.stringify(this.props.company.tasks)),
            company: this.props.company._id,
            update: false,
        };
        this.handleChanges = this.handleChanges.bind(this);
        this.updateCompanyTasks = this.updateCompanyTasks.bind(this);
    }
    handleChanges() {
        saveChangesOnLeave(
            this.state.tasks, //initial state
            this.props.company.tasks, //redux updated state
            this.props.endSession,
            `/api/companies/tasks/${this.props.company._id}`
        );
    }

    updateCompanyTasks(tasks) {
        this.props.updateCompanyArr('tasks', tasks, this.props.company._id);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleChanges);
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleChanges);
    }
    render() {
        return (
            <section className='company-tasks'>
                <h2 className='sr-only'>Company Tasks.</h2>
                {this.props.company.tasks.length === 0 && (
                    <span className='tile tile--info'>
                        <img src={infoIcon} alt='' className='icon--md' />
                        Currently there are no tasks saved. Add a new one now.
                    </span>
                )}
                {this.props.company.tasks.length > 0 && (
                    <TasksDisplayTable
                        companyID={this.props.company._id}
                        tasks={this.props.company.tasks}
                        updateState={this.updateCompanyTasks}
                    />
                )}
                <TaskForm
                    companyID={this.props.company._id}
                    update={this.state.update}
                    updateTasksArr={this.props.getAllCompanies}
                />
            </section>
        );
    }
}

CompanyTasks.propTypes = {
    company: PropTypes.object,
    updateCompanyArr: PropTypes.func,
    getAllCompanies: PropTypes.func,
    endSession: PropTypes.func,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    getAllCompanies,
    updateCompanyArr,
    endSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyTasks);
