import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import FormInput from '../components/FormInput';
import FormErrorsDisplay from '../components/FormErrorsDisplay';
import { formErrorsStyling } from '../utils/formFuns';
import {
    validateStringToQty,
    validateStringToCurrency,
    validateStringToPercentage,
    strToNum,
} from '../utils/validations';

export default function TaskForm({ companyID, updateTasksArr, taskID }) {
    const [formData, setFormData] = useState({
        description: '',
        qty: 'N/A',
        rate: 'N/A',
        tax: 'N/A',
        errors: [],
    });
    const handleAdd = async (e) => {
        e.preventDefault();
        let { description, qty, rate, tax } = formData;
        const strValues = ['free', 'n/a'];
        const errors = [];

        description = description.trim();
        if (!description) {
            const error = {
                param: 'description',
                msg: 'Please describe the task.',
            };
            errors.push(error);
        }
        //validate qty input
        qty = qty.trim();
        let qtyValue = validateStringToQty(qty);
        if (!strValues.includes(qty.toLocaleLowerCase()) && !qtyValue) {
            const error = {
                param: 'qty',
                msg:
                    'Please enter Qty value in one of the following formats: 1,000.50, 1 , 3 items, FREE or N/A.',
            };
            errors.push(error);
        } else {
            if (qtyValue) qtyValue = strToNum(qtyValue);
        }
        //validate rate input
        rate = rate.trim();
        const rateObj = validateStringToCurrency(rate);
        console.log(rateObj);
        if (!strValues.includes(rate.toLocaleLowerCase()) && !rateObj) {
            const error = {
                param: 'rate',
                msg:
                    'Please enter Rate value in one of the following formats: 1,000 PLN, £ 10.50 , FREE or N/A.',
            };
            errors.push(error);
        } else {
            if (rateObj) rate = rateObj.currency + rateObj.numValue;
        }
        //validate tax input
        tax = tax.trim();
        const taxValue = validateStringToPercentage(tax);
        if (!strValues.includes(tax.toLocaleLowerCase()) && !taxValue) {
            const error = {
                param: 'tax',
                msg:
                    'Please enter the Tax value in one of the following formats: 10%, 1-100 , FREE or N/A.',
            };
            errors.push(error);
        } else {
            if (taxValue) tax = taxValue + '%';
        }
        //rate without qty
        if (rateObj && strValues.includes(qty.toLocaleLowerCase())) {
            const error = {
                param: 'qty',
                msg: 'Please provide quantity for entered rate.',
            };
            errors.push(error);
        }
        //calculate gross and net amount

        let amount;
        if (rateObj && qtyValue) {
            const amountGross = strToNum(rateObj.numValue) * qtyValue;
            let amountTaxed = 0;
            if (taxValue)
                amountTaxed = (
                    amountGross *
                    (strToNum(taxValue) / 100)
                ).toFixed(2);
            amountTaxed = strToNum(amountTaxed);

            amount = {
                currency: rateObj.currency,
                amountGross,
                amountTaxed,
                amountNet: amountGross - amountTaxed,
            };
        } else {
            //N/A and FREE values
            amount = rate.toUpperCase();
        }

        if (errors.length > 0) {
            setFormData({
                ...formData,
                errors,
            });
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            //create task
            const task = {
                _id: taskID || uuidv4(),
                description,
                qty: qty || 'N/A',
                rate: rate || 'N/A',
                tax: tax || '0%',
                amount,
                addToInvoice: true,
                createdAt: new Date(),
            };

            await axios.post(
                `/api/companies/task/${companyID}`,
                JSON.stringify(task),
                config
            );
            //update company tasks
            updateTasksArr();
            //reset state
            setFormData({
                description: ' ',
                qty: 'N/A',
                rate: 'N/A',
                tax: 'N/A',
                errors: [],
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        formErrorsStyling(formData.errors);
    }, [formData.errors]);
    return (
        <form className='task-form' onSubmit={handleAdd}>
            <fieldset>
                <legend>
                    <b>Add a new task to bill for. {companyID}</b>
                    <p>
                        <small> *Required</small>
                    </p>
                </legend>
                <div className='grid-3-cls'>
                    <span className='col-span-3'>
                        <FormInput
                            form={{ formData, setFormData }}
                            name='description'
                            size='auto'
                        >
                            Description*
                        </FormInput>
                    </span>
                    <span>
                        <FormInput
                            form={{ formData, setFormData }}
                            name='qty'
                            size='auto'
                        >
                            Qty* (eg. 1, 2.5hr, N/A, Free)
                        </FormInput>
                    </span>
                    <span>
                        {' '}
                        <FormInput
                            form={{ formData, setFormData }}
                            name='rate'
                            size='auto'
                        >
                            Rate* (eg. £11, N/A, Free)
                        </FormInput>
                    </span>
                    <span>
                        <FormInput
                            form={{ formData, setFormData }}
                            name='tax'
                            size='auto'
                        >
                            Tax* (eg. 10%, 10)
                        </FormInput>
                    </span>
                </div>
                <button
                    className='btn btn--info'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleAdd}
                >
                    Add Item
                </button>
            </fieldset>
            {formData.errors.length > 0 && (
                <FormErrorsDisplay
                    errors={formData.errors}
                    label='Add custom field form'
                />
            )}
        </form>
    );
}
