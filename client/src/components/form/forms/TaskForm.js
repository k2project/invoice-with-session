import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllCompanies } from '../../../redux/actions/companies';
import FormInput from '../components/FormInput';
import FormErrorsDisplay from '../components/FormErrorsDisplay';
import { formErrorsStyling } from '../utils/formFuns';
import {
    validateStringToQty,
    validateStringToCurrency,
    validateStringToPercentage,
    strToNum,
} from '../utils/validations';
import { setCurrentTask } from '../../../redux/actions/session';

export const TaskForm = ({
    currentCompany,
    getAllCompanies,
    currentTask,
    setCurrentTask,
    tasks,
}) => {
    const initState = {
        description: '',
        qty: 'N/A',
        rate: 'N/A',
        tax: '0%',
        errors: [],
    };

    const [formData, setFormData] = useState(initState);
    useEffect(() => {
        if (currentTask) {
            setFormData({ ...currentTask, errors: [] });
        } else {
            //clear form on curent task deletion
            setFormData(initState);
        }
    }, [currentTask]);
    const handleSubmit = async (e) => {
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
        if (!strValues.includes(rate.toLocaleLowerCase()) && !rateObj) {
            const error = {
                param: 'rate',
                msg:
                    'Please enter Rate value in one of the following formats: 1,000 PLN, £ 10.50 , FREE or N/A.',
            };
            errors.push(error);
        } else {
            if (rateObj) {
                //check if different currency has been used
                const different_currencies = [];
                tasks.forEach((el) => {
                    if (
                        el.amount.currency &&
                        el.amount.currency !== rateObj.currency
                    ) {
                        different_currencies.push(1);
                    }
                });
                if (different_currencies.length > 0) {
                    const error = {
                        param: 'rate',
                        msg:
                            'Please provide the same currency for all entries.',
                    };
                    errors.push(error);
                }
                rate = rateObj.currency + rateObj.numValue;
            }
        }

        //validate tax input
        tax = tax.trim();
        const taxValue = validateStringToPercentage(tax);
        if (!taxValue) {
            const error = {
                param: 'tax',
                msg:
                    'Please enter the Tax value in one of the following formats: 0% - 100% or 0-100',
            };
            errors.push(error);
        } else {
            if (taxValue) tax = taxValue + '%';
        }
        //rate value without qty value
        if (rateObj && strValues.includes(qty.toLocaleLowerCase())) {
            const error = {
                param: 'qty',
                msg: 'Please provide quantity for entered rate.',
            };
            errors.push(error);
        }
        //calculate taxed and net amount
        let amount;
        if (rateObj && qtyValue) {
            //net : excluding vat
            const amountNet = strToNum(rateObj.numValue) * qtyValue;
            let amountTaxed = '0';
            if (taxValue)
                amountTaxed = (amountNet * (strToNum(taxValue) / 100)).toFixed(
                    2
                );
            amountTaxed = strToNum(amountTaxed);

            amount = {
                currency: rateObj.currency,
                amountNet,
                amountTaxed,
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
                description,
                qty: qty || 'N/A',
                rate: rate || 'N/A',
                tax: tax || '0%',
                amount,
            };
            task._id = currentTask ? currentTask._id : uuidv4();
            task.addToInvoice = currentTask ? currentTask.addToInvoice : true;
            task.createdAt = currentTask ? currentTask.createdAt : new Date();

            await axios.post(
                `/api/companies/task/${currentCompany}`,
                JSON.stringify(task),
                config
            );
            getAllCompanies();
            setCurrentTask(null);
            //reset state
            setFormData(initState);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        formErrorsStyling(formData.errors);
    }, [formData.errors]);
    return (
        <form className='task-form' onSubmit={handleSubmit}>
            <fieldset>
                <legend>
                    <b>Add a new task to bill for.</b>
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
                            <b>Description*</b>
                        </FormInput>
                    </span>
                    <span>
                        <FormInput
                            form={{ formData, setFormData }}
                            name='qty'
                            size='auto'
                        >
                            <b>Qty* </b>
                            <small>(e.g. 1, 2.5hr, N/A, Free)</small>
                        </FormInput>
                    </span>
                    <span>
                        {' '}
                        <FormInput
                            form={{ formData, setFormData }}
                            name='rate'
                            size='auto'
                        >
                            <b>Rate* </b>
                            <small>(e.g. £11, N/A, Free)</small>
                        </FormInput>
                    </span>
                    <span>
                        <FormInput
                            form={{ formData, setFormData }}
                            name='tax'
                            size='auto'
                        >
                            <b>Tax* </b>
                            <small>(e.g. 10%, 10, N/A, Free)</small>
                        </FormInput>
                    </span>
                </div>

                <button
                    className='btn btn--info'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleSubmit}
                >
                    {currentTask ? 'Update ' : 'Add '} Item
                </button>
                {currentTask && (
                    <button
                        className='btn btn--grey'
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setCurrentTask(null)}
                    >
                        Cancel
                    </button>
                )}
            </fieldset>
            {formData.errors.length > 0 && (
                <FormErrorsDisplay
                    errors={formData.errors}
                    label='Add custom field form'
                />
            )}
        </form>
    );
};

TaskForm.propTypes = {
    company: PropTypes.object,
    getAllCompanies: PropTypes.func,
    tasks: PropTypes.array,
};

const mapStateToProps = (state) => ({
    currentCompany: state.session.currentCompany,
    currentTask: state.session.currentTask,
    tasks: state.companies.find((c) => c._id === state.session.currentCompany)
        .tasks,
});

const mapDispatchToProps = {
    getAllCompanies,
    setCurrentTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
