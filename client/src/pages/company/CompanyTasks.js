import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCompanyArr } from '../../redux/actions/companies';
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
            tasks: JSON.parse(JSON.stringify(props.company.details)),
            company: this.props.company._id,
            update: false,
        };
        this.handleChanges = this.handleChanges.bind(this);
        this.updateCompanyTasks = this.updateCompanyTasks.bind(this);
        this.updateTasksArr = this.updateTasksArr.bind(this);
    }
    handleChanges() {
        // saveChangesOnLeave(
        //     this.state.tasks, //initial state
        //     this.props.company.tasks, //redux updated state
        //     this.props.endSession,
        //     `/api/companies/tasks/${this.props.company._id}`
        // );
    }
    updateTasksArr() {}
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
                {this.props.company.tasks.length === 0 && (
                    <span className='tile tile--info'>
                        <img src={infoIcon} alt='' className='icon--md' />
                        Currently there are no tasks saved. Add a new one now.
                    </span>
                )}
                {this.props.company.tasks.length > 0 && (
                    <TasksDisplayTable
                        tasks={this.props.company.tasks}
                        updateState={this.updateCompanyTasks}
                    />
                )}
                <TaskForm
                    companyID={this.state.company}
                    update={this.state.update}
                    updateTasksArr={this.updateTasksArr}
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
