import React, { useState } from 'react';
import './InvoiceDoc.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentTask } from '../../../../redux/actions/session';
import TaskDisplayTable from '../../../../components/form/components/TasksDisplayTable';
import { amountDisplayWithComas } from '../../../../components/form/utils/validations';
import TaskForm from '../../../../components/form/forms/TaskForm';
import plusIcon from '../../../../imgs/icons/plusIcon.png';
import updateIcon from '../../../../imgs/icons/updateIcon.png';
import tasksIcon from '../../../../imgs/icons/tasksIcon.png';

const InvoiceDocItems = ({ company, setCurrentTask, currentTask }) => {
    let { tasks } = company;
    //if invoice update add invoice's tasks to the company's tasks arr
    //display recepient details in the invoice
    const tasksDetails = tasks
        .filter((t) => t.addToInvoice)
        .map((t) => {
            //before tax
            let amount = amountDisplayWithComas(t.amount);
            return (
                <tr key={`i-list-${t._id}`}>
                    <th scope='row' className='invoice__td-desc'>
                        {t.description}
                    </th>
                    <td className='invoice__td-qty'>{t.qty}</td>
                    <td className='invoice__td-rate'>{t.rate}</td>
                    {/* <td className='invoice__td-tax'>{t.tax}</td> */}
                    <td className='invoice__td-amount'>{amount}</td>
                    <td className='invoice__td-btn'>
                        <button
                            type='button'
                            className='invoice__btn invice__btn--rel'
                            title='Update Items'
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => open_task_form_update(t)}
                        >
                            <img src={updateIcon} alt='Update Items' />
                        </button>
                    </td>
                </tr>
            );
        });

    const [showTasks, setShowTasks] = useState(true);
    const open_tasks = async () => {
        if (showTasks === true || tasks.length === 0)
            return setShowTasks(false);
        await setShowTasks(true);
        document.querySelector('.tasks-table tbody').focus();
    };

    const [showTaskForm, setShowTaskForm] = useState(true);
    const open_task_form = async () => {
        //toggle show form only when the plus icon clicked again
        //if form opened for update already, clear inputs
        setCurrentTask(null);
        if (!currentTask && showTaskForm === true)
            return setShowTaskForm(false);
        await setShowTaskForm(true);
        //set focus on first button for screen reader users
        document.querySelector('.invoice__task-form input').focus();
    };
    const open_task_form_update = async (task) => {
        //toggle show form on click of the same item update button
        //different item change input value accordingly
        if (currentTask && task._id === currentTask._id) {
            setCurrentTask(null);
            return setShowTaskForm(false);
        }
        if (task) await setCurrentTask(task);
        await setShowTaskForm(true);
        //set focus on first button for screen reader users
        document.querySelector('.invoice__task-form input').focus();
    };

    return (
        <div className='invoice__items-box'>
            <section className='invoice__items'>
                <h2 className='sr-only'>Invoice items display.</h2>
                <div>
                    {tasks.length > 0 && (
                        <button
                            type='button'
                            className='invoice__btn icon_iTasks'
                            title='Display All Items'
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={open_tasks}
                        >
                            <img src={tasksIcon} alt='Display All Items' />
                        </button>
                    )}
                </div>
            </section>
            <section className='invoice__items'>
                <table>
                    <caption className='sr-only'>
                        <b>Invoice item list.</b>
                    </caption>
                    <thead>
                        <tr>
                            <th scope='col' className='invoice__td-dec'>
                                <b>DESCRIPTION</b>
                            </th>
                            <th scope='col' className='invoice__td-qty'>
                                <b>QTY</b>
                            </th>
                            <th scope='col' className='invoice__td-rate'>
                                <b>RATE</b>
                            </th>
                            {/* <th scope='col' className='invoice__td-tax'>
                                <b>TAX</b>
                            </th> */}
                            <th scope='col' className='invoice__td-amount'>
                                <b>AMOUNT</b>
                            </th>
                            <th className='invoice__td-btn'>
                                <b className='sr-only'>Update button</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='invoice__items-tbody'>
                        {tasksDetails}
                    </tbody>
                </table>
                <div className='invoice__items-btm'>
                    <button
                        type='button'
                        className='invoice__btn icon_iAdd-task'
                        title='Add a new item.'
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={open_task_form}
                    >
                        <img src={plusIcon} alt='Add a new item.' />
                    </button>
                </div>
            </section>

            {showTasks && tasks.length > 0 && (
                <section className='invoice__tasks'>
                    <h3 className='sr-only'>
                        Change <strong>items list</strong>.
                    </h3>
                    <TaskDisplayTable />
                    <button
                        type='button'
                        className='close'
                        onClick={() => setShowTasks(false)}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <span>&times;</span>
                    </button>
                </section>
            )}

            {showTaskForm && (
                <section className='invoice__task-form'>
                    <h3 className='sr-only'>
                        <strong>Task Form.</strong>Add or update an item.
                    </h3>
                    <TaskForm />
                    <button
                        type='button'
                        className='close'
                        onClick={() => setShowTaskForm(false)}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <span>&times;</span>
                    </button>
                </section>
            )}
        </div>
    );
};

InvoiceDocItems.propTypes = {
    company: PropTypes.object,
    setCurrentTask: PropTypes.func,
    currentTask: PropTypes.object,
};
const mapStateToProps = (state) => ({
    company: state.companies.find(
        (c) => c._id === state.session.currentCompany
    ),
    currentTask: state.session.currentTask,
});
const mapDispatchToProps = {
    setCurrentTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDocItems);
