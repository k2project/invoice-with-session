import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import FormInput from '../components/FormInput';
import FormErrorsDisplay from '../components/FormErrorsDisplay';
import { formErrorsStyling } from '../utils/formFuns';
import { updateCompanyArr } from '../../../redux/actions/companies';
import {
    validateStringToQty,
    validateStringToCurrency,
    validateStringToPercentage,
} from '../utils/validations';

export default function TaskForm({ companyID, updateTasksArr, update }) {
    const [formData, setFormData] = useState({
        description: '',
        qty: '',
        rate: '',
        tax: '',
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
        if (
            !strValues.includes(qty.toLocaleLowerCase()) &&
            !validateStringToQty(qty)
        ) {
            const error = {
                param: 'qty',
                msg:
                    'Please enter Qty value in one of the following formats: 1,000.50, 1 , 3 items, FREE or N/A.',
            };
            errors.push(error);
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
            rate = rateObj.currency + ' ' + rateObj.numValue;
        }
        //validate tax input
        tax = tax.trim();
        const taxValue = validateStringToPercentage(tax);
        console.log(rateObj);
        if (!strValues.includes(tax.toLocaleLowerCase()) && !taxValue) {
            const error = {
                param: 'tax',
                msg:
                    'Please enter the Tax value in one of the following formats: 10%, 1-100 , FREE or N/A.',
            };
            errors.push(error);
        } else {
            tax = tax + ' %';
        }
        //calculate gross and net amount
        const amount = {
            currency: rateObj.currency,
            amountGross: rateObj.numValue,
            amountNet: (rateObj.numValue * tax) / 100,
        };

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
                _id: uuidv4(),
                description,
                qty: qty || 'N/A',
                rate: rate || 'N/A',
                tax: tax || '0%',
                amount,
                addToInvoice: true,
                createdAt: new Date(),
            };
            let body = { task };
            if (update) body.update = update;
            body = JSON.stringify(body);
            console.log(companyID);
            await axios.post(`/api/companies/tasks/${companyID}`, body, config);
            //update company tasks
            updateCompanyArr();
            //reset state
            setFormData({
                description: '',
                qty: '',
                rate: '',
                amount: '',
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
                            Qty (eg. 1, 2.5hr, N/A, Free)
                        </FormInput>
                    </span>
                    <span>
                        {' '}
                        <FormInput
                            form={{ formData, setFormData }}
                            name='rate'
                            size='auto'
                        >
                            Rate (eg. £11, N/A, Free)
                        </FormInput>
                    </span>
                    <span>
                        <FormInput
                            form={{ formData, setFormData }}
                            name='tax'
                            size='auto'
                        >
                            Tax (eg. 10%, 10)
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
