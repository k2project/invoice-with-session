import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../../redux/actions/messages';
import { setCurrentTask } from '../../../redux/actions/session';
import { updateCompanyArr } from '../../../redux/actions/companies';
import arrowIcon from '../../../imgs/icons/arrow.png';
import updateIcon from '../../../imgs/icons/updateIcon.png';
import deleteIcon from '../../../imgs/icons/deleteIcon.png';
import calendarIcon from '../../../imgs/icons/calendar.png';
import {
    moveItemUpOrDown,
    toggleIncludedInInvoice,
    deleteItem,
} from '../utils/displayTableFun';
import { dateNum } from '../../../utils/dates';

const TasksDisplayTable = ({
    currentCompany,
    tasks,
    updateCompanyArr,
    currentTask,
    setCurrentTask,
    setAlert,
}) => {
    const [tableState, setTableState] = useState([]);
    useEffect(() => {
        setTableState(tasks);
    }, [tasks]);
    useEffect(() => {
        const trArr = Array.from(document.querySelectorAll('.tasks-table tr'));
        if (currentTask) {
            trArr.forEach((tr) => {
                if (tr.getAttribute('id') !== currentTask._id) {
                    tr.style.display = 'none';
                }
            });
        } else {
            trArr.forEach((tr) => (tr.style.display = 'grid'));
        }
    }, [currentTask]);

    const updateState = (tasks) => {
        updateCompanyArr('tasks', tasks, currentCompany);
    };
    const updateTask = (e, task) => {
        setCurrentTask(task);
        const firstInput = document.querySelector('.task-form #description');
        firstInput.focus();
        firstInput.scrollIntoView();
    };
    const deleteTask = async (e, id) => {
        setCurrentTask(null);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            await axios.put(
                `/api/companies/task/${currentCompany}`,
                JSON.stringify({ id }),
                config
            );
            deleteItem(id, tableState, setTableState, updateState);
            setAlert(
                'Task has been deleted successfully.',
                'success',
                null,
                false
            );
        } catch (err) {
            setAlert(
                "We are sorry, but couldn't delete the task.",
                'danger',
                null,
                false
            );
        }
    };

    return (
        <table className='tasks-table'>
            <caption>
                <b>Current tasks list.</b>
                <p>
                    Use arrows to move items up and down the list. By default
                    all items will be included in a new invoice form and remove
                    from the list once the invoice is created.
                </p>
            </caption>
            <thead>
                <tr className='sr-only' id='task-table-tr-head'>
                    <th scope='col'>Created at</th>
                    <th scope='col'>Task description</th>
                    <th scope='col'>Item Quantity</th>
                    <th scope='col'>Rate</th>
                    <th scope='col'>Tax</th>
                    <th scope='col'>Add task to a new invoice</th>
                    <th scope='col'>Move Item Up</th>
                    <th scope='col'>Move Item Down</th>
                    <th scope='col'>Update Task</th>
                    <th scope='col'>Delete Task</th>
                </tr>
            </thead>
            <tbody>
                {tableState.map((item, index, arr) => (
                    <tr
                        data-details-index={index}
                        key={item._id}
                        className='tile'
                        id={item._id}
                    >
                        <td
                            className='td__date'
                            title={dateNum(item.createdAt)}
                        >
                            <img
                                src={calendarIcon}
                                alt={`Created at ${dateNum(item.createdAt)}`}
                            />
                            <span aria-hidden='true'>
                                {dateNum(item.createdAt).slice(0, 2)}
                            </span>
                        </td>
                        <th scope='row'>{item.description}</th>
                        <td className='td__value'>{item.qty}</td>
                        <td className='td__value'>{item.rate}</td>
                        <td className='td__value'>{item.tax}</td>
                        <td className='td__btn'>
                            <button
                                title='Update task'
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => {
                                    updateTask(e, item);
                                }}
                            >
                                <img src={updateIcon} alt='Update task' />
                            </button>
                        </td>
                        <td className='td__btn'>
                            <button
                                title='Delete task'
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => {
                                    deleteTask(e, item._id);
                                }}
                            >
                                <img src={deleteIcon} alt='Delete task' />
                            </button>
                        </td>
                        <td className='td__btn'>
                            <button
                                title={
                                    item.addToInvoice
                                        ? 'Item will be included in the new invoice.'
                                        : ' Item will NOT be included in the new invoice.'
                                }
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    toggleIncludedInInvoice(
                                        index,
                                        tableState,
                                        setTableState,
                                        updateState
                                    );
                                }}
                            >
                                {item.addToInvoice ? (
                                    <span>&#43;</span>
                                ) : (
                                    <span>&#45;</span>
                                )}
                            </button>
                        </td>
                        <td className='td__btn'>
                            {index !== 0 && (
                                <button
                                    onMouseDown={(e) => e.preventDefault()}
                                    className='arrow-up'
                                    title='Move item up'
                                    onClick={(e) =>
                                        moveItemUpOrDown(
                                            e,
                                            'up',
                                            tableState,
                                            setTableState,
                                            updateState
                                        )
                                    }
                                >
                                    <img src={arrowIcon} alt='move item up' />
                                </button>
                            )}
                        </td>
                        <td className='td__btn'>
                            {index !== arr.length - 1 && (
                                <button
                                    onMouseDown={(e) => e.preventDefault()}
                                    className='arrow-down'
                                    title='Move item down'
                                    onClick={(e) =>
                                        moveItemUpOrDown(
                                            e,
                                            'down',
                                            tableState,
                                            setTableState,
                                            updateState
                                        )
                                    }
                                >
                                    <img src={arrowIcon} alt='move item up' />
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
TasksDisplayTable.propTypes = {
    currentCompany: PropTypes.string,
    tasks: PropTypes.array,
    setAlert: PropTypes.func,
    setCurrentTask: PropTypes.func,
    updateCompanyArr: PropTypes.func,
};
const mapStateToProps = (state) => ({
    currentCompany: state.session.currentCompany,
    currentTask: state.session.currentTask,
    tasks: state.companies.find((c) => c._id === state.session.currentCompany)
        .tasks,
});
const mapDispatchToProps = {
    setAlert,
    updateCompanyArr,
    setCurrentTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksDisplayTable);
