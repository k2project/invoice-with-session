import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllCompanies } from '../../../redux/actions/companies';
import FormInput from '../components/FormInput';
import FormErrorsDisplay from '../components/FormErrorsDisplay';
import { formErrorsStyling } from '../utils/formFuns';
import {
    validateQtyInputToNum,
    validateRateInputToObj,
    validateTaxInputValueToNum,
    toNumberWithCommas,
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
    const searchArr = useLocation().search.split('&');
    const tab = searchArr[0].slice(5);
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
        const non_numerical_inputs = ['FREE', 'N/A'];
        const errors = [];

        description = description.trim();
        if (!description) {
            const error = {
                param: 'description',
                msg: 'Please describe the task.',
            };
            errors.push(error);
        }
        //validate qty input value
        qty = qty.trim();
        const qty_numerical_value = validateQtyInputToNum(qty);
        if (
            !non_numerical_inputs.includes(qty.toUpperCase()) &&
            !qty_numerical_value
        ) {
            const error = {
                param: 'qty',
                msg:
                    "Please enter Qty value in one of the following formats: 1,000.50, 1 , 3 items, FREE or N/A. Qty mustn't be zero.",
            };
            errors.push(error);
        }
        //validate rate input
        //returns {currency, numValue}
        rate = rate.trim();
        const rate_obj = validateRateInputToObj(rate);
        if (!non_numerical_inputs.includes(rate.toUpperCase()) && !rate_obj) {
            const error = {
                param: 'rate',
                msg:
                    'Please enter Rate value in one of the following formats: 1,000 PLN, £ 10.50 , FREE or N/A.',
            };
            errors.push(error);
        } else {
            if (rate_obj) {
                //check if currency exist
                if (!rate_obj.currency) {
                    const error = {
                        param: 'rate',
                        msg:
                            'Please provide some form of currency for the entered rate value.',
                    };
                    errors.push(error);
                }
                //check if different currency has been used
                const different_currencies = [];
                tasks.forEach((el) => {
                    if (
                        el.amount.currency &&
                        el.amount.currency !== rate_obj.currency
                    ) {
                        different_currencies.push(1);
                    }
                });
                if (different_currencies.length > 0) {
                    const error = {
                        param: 'rate',
                        msg:
                            'Please provide the same currency for all rate entries.',
                    };
                    errors.push(error);
                }
                rate =
                    rate_obj.currency + toNumberWithCommas(rate_obj.numValue);
            }
        }

        //validate tax input
        tax = tax.trim();
        const tax_numerical_value = validateTaxInputValueToNum(tax);
        if (!tax_numerical_value && tax_numerical_value !== 0) {
            const error = {
                param: 'tax',
                msg:
                    'Please enter the Tax value in one of the following formats: 0% - 100% or 0-100',
            };
            errors.push(error);
        } else {
            //in case input is without %
            tax = tax_numerical_value + '%';
        }
        //check for a rate value without qty value
        //for rate === string, amount === string
        if (rate_obj && non_numerical_inputs.includes(qty.toUpperCase())) {
            const error = {
                param: 'qty',
                msg:
                    "Please item's provide quantity for the entered rate value.",
            };
            errors.push(error);
        }
        //calculate taxed and net amount
        let amount;
        if (rate_obj && qty_numerical_value) {
            //net : excluding vat
            const amountNet = rate_obj.numValue * qty_numerical_value;
            let amountTaxed = 0;
            if (tax_numerical_value)
                amountTaxed = amountNet * (tax_numerical_value / 100);
            amountTaxed = amountTaxed.toFixed(2);
            amountTaxed = +amountTaxed;
            amount = {
                currency: rate_obj.currency,
                amountNet,
                amountTaxed,
            };
        } else {
            // for N/A and FREE values
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

            const addToInvoiceForNewEntry = tab === 'invoice' ? true : false;
            task.addToInvoice = currentTask
                ? currentTask.addToInvoice
                : addToInvoiceForNewEntry;
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
                    {/* <span>
                        <FormInput
                            form={{ formData, setFormData }}
                            name='tax'
                            size='auto'
                        >
                            <b>Tax* </b>
                            <small>(e.g. 10%, 10, N/A, Free)</small>
                        </FormInput>
                    </span> */}
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
