import React from 'react';
import arrowIcon from '../../../imgs/icons/arrow.png';

export default function DetailsDisplayTable({ details }) {
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
                {details
                    .filter((item) => item.value)
                    .map((item) => {
                        return (
                            <tr key={item._id}>
                                <th scope='row'>{item.label}:</th>
                                <td className='value'>{item.value}</td>
                                <td
                                // onClick={() => {
                                //     task.addToNextInvoice = !addToNextInvoice;
                                //     toggleTaskInvoiceDisplay(_id, task);
                                // }}
                                >
                                    <button
                                        onMouseDown={(e) => e.preventDefault()}
                                        title={
                                            item.addToInvoice
                                                ? 'Item will be included in the new invoice.'
                                                : ' Item will NOT be included in the new invoice.'
                                        }
                                    >
                                        {item.addToInvoice ? (
                                            <b>&#43;</b>
                                        ) : (
                                            <b>&#45;</b>
                                        )}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onMouseDown={(e) => e.preventDefault()}
                                        className='arrow-up'
                                        title='Move item up'
                                    >
                                        <img
                                            src={arrowIcon}
                                            alt='move item up'
                                        />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onMouseDown={(e) => e.preventDefault()}
                                        className='arrow-down'
                                        title='Move item down'
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
        </table>
    );
}
