import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import FormInput from '../components/FormInput';
import FormErrorsDisplay from '../components/FormErrorsDisplay';
import { formErrorsStyling } from '../utils/formFuns';
import {
    getAllTasks,
    updateCompanyArr,
} from '../../../redux/actions/companies';

export default function TaskForm({ companyID, updateTasksArr, update }) {
    const [formData, setFormData] = useState({
        description: '',
        qty: '',
        rate: '',
        amount: '',
        errors: [],
    });
    const handleAdd = async (e) => {
        e.preventDefault();
        const { description, qty, rate, amount } = formData;
        const errors = [];
        if (!description.trim()) {
            const error = {
                param: 'description',
                msg: 'Please describe the task.',
            };
            errors.push(error);
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
                _id: uuidv4(),
                description,
                qty: 'N/A' || qty,
                rate: 'N/A' || rate,
                amount: 'N/A' || amount,
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
        <Fragment>
            <fieldset className='add-task'>
                <legend>
                    <b>Add a new task.</b>
                </legend>
                <FormInput
                    form={{ formData, setFormData }}
                    name='description'
                    size='auto'
                >
                    Description*
                </FormInput>
                <FormInput
                    form={{ formData, setFormData }}
                    name='qty'
                    size='auto'
                >
                    Qty
                </FormInput>

                <FormInput
                    form={{ formData, setFormData }}
                    name='rate'
                    size='auto'
                >
                    Rate
                </FormInput>
                <FormInput
                    form={{ formData, setFormData }}
                    name='amount'
                    size='auto'
                >
                    Amount
                </FormInput>

                <button
                    className='btn btn--grey'
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
        </Fragment>
    );
}
