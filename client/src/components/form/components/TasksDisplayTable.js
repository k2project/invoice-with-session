import React, { useState } from 'react';
import PropTypes from 'prop-types';
import arrowIcon from '../../../imgs/icons/arrow.png';
import updateIcon from '../../../imgs/icons/updateIcon.png';
import deleteIcon from '../../../imgs/icons/deleteIcon.png';
import {
    moveItemUpOrDown,
    toggleIncludedInInvoice,
} from '../utils/displayTableFun';

export default function TasksDisplayTable({ tasks, updateState }) {
    const [tableState, setTableState] = useState(tasks);
    console.log(tableState);
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
                <tr className='sr-only'>
                    <th scope='col'>Task description</th>
                    <th scope='col'>Item Quantity</th>
                    <th scope='col'>Rate</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'>Add task to a new invoice</th>
                    <th scope='col'>Move Item Up</th>
                    <th scope='col'>Move Item Down</th>
                    <th scope='col'>Update Task</th>
                    <th scope='col'>Delete Task</th>
                </tr>
            </thead>
            <tbody>
                {tableState.length === 0 && (
                    <span className='tile'>
                        <tr key='no-tasks' className='no-task'>
                            <td colSpan='9'>
                                You have currently none tasks saved.
                            </td>
                        </tr>
                    </span>
                )}

                {tableState.length > 0 &&
                    tableState.map((item, index, arr) => (
                        <tr data-details-index={index} key={item._id}>
                            <span className='tile' key={item._id}>
                                <th scope='row'>{item.description}</th>
                                <td className='td__value'>{item.qty}</td>
                                <td className='td__value'>{item.rate}</td>
                                <td className='td__value'>{item.amount}</td>
                            </span>
                            <td>
                                <button
                                    onMouseDown={(e) => e.preventDefault()}
                                    title={
                                        item.addToInvoice
                                            ? 'Item will be included in the new invoice.'
                                            : ' Item will NOT be included in the new invoice.'
                                    }
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
                            <td>
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
                                        <img
                                            src={arrowIcon}
                                            alt='move item up'
                                        />
                                    </button>
                                )}
                            </td>
                            <td>
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
                                        <img
                                            src={arrowIcon}
                                            alt='move item up'
                                        />
                                    </button>
                                )}
                            </td>
                            <td>
                                <button
                                    onMouseDown={(e) => e.preventDefault()}
                                    className=''
                                    title='Update task'
                                >
                                    <img src={updateIcon} alt='Update task' />
                                </button>
                            </td>
                            <td>
                                <button
                                    onMouseDown={(e) => e.preventDefault()}
                                    className=''
                                    title='Delete task'
                                >
                                    <img src={deleteIcon} alt='Delete task' />
                                </button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}
TasksDisplayTable.propTypes = {
    tasks: PropTypes.array,
};
