import React, { useState } from 'react';
import PropTypes from 'prop-types';
import arrowIcon from '../../../imgs/icons/arrow.png';
import {
    moveItemUpOrDown,
    toggleIncludedInInvoice,
} from '../utils/detailsDisplayTableFun';

export default function DetailsDisplayTable({ details, updateState }) {
    const [tableState, setTableState] = useState(details);
    return (
        <table className='details-table'>
            <caption>
                <b>Details list.</b>
                <p>
                    Use arrows to move items up and down the list. By default
                    all items will be included in a new invoice form. You can
                    always change that with the plus button.
                </p>
            </caption>
            <thead>
                <tr className='sr-only'>
                    <th scope='col'>Add task to a new invoice</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Value</th>
                    <th scope='col'>Move Item Up</th>
                    <th scope='col'>Move Item Down</th>
                </tr>
            </thead>
            <tbody>
                {tableState.map((item, index, arr) => {
                    if (item.value && item.inputType !== 'textarea')
                        return (
                            <tr key={item._id} data-details-index={index}>
                                <th scope='row'>{item.label}:</th>
                                <td className='td__value'>{item.value}</td>
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
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
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
                                <td className='td__last'>
                                    {/* last td of last tr disabled with css */}
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
                                </td>
                            </tr>
                        );
                })}
            </tbody>

            {tableState
                .filter((item) => item.inputType === 'textarea' && item.value)
                .map((item) => (
                    <tfoot key={item._id}>
                        <tr>
                            <th scope='row'>{item.label}:</th>
                            <td colSpan='0'>{item.value}</td>
                        </tr>
                    </tfoot>
                ))}
        </table>
    );
}
DetailsDisplayTable.propTypes = {
    details: PropTypes.array,
};
