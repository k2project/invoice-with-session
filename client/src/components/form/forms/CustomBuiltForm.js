import React, { useState, useEffect, Fragment } from 'react';
import '../Form.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormErrorsDisplay from '../components/FormErrorsDisplay';
import { isRequired, isValidated } from '../utils/validations';
import { customInputOnChange, formErrorsStyling } from '../utils/formFuns';
import AddCustomFields from './AddCustomFields';
import RemoveCustomFields from './RemoveCustomFields';
import { setAlert } from '../../../redux/actions/messages';

const CustomBuiltForm = ({
    data: {
        details,
        http,
        url,
        cb,
        updateInitStateToReduxStateOnSubmit,
        msg,
        reset,
    },
    setAlert,
    history,
}) => {
    //declare Form's State
    const [formState, setFormState] = useState(details);
    const [errors, setErrors] = useState([]);

    const addCustomToFieldsFormState = (field) => {
        const position = field.position;
        delete field.position;
        formState.splice(position, 0, field);
        setFormState([...formState]);
    };
    const removeCustomFieldsFromFormState = (field) => {
        const index = formState.indexOf(field);
        formState.splice(index, 1);
        setFormState([...formState]);
    };

    //handle input change
    const updateInput = (e, id) => {
        customInputOnChange(e, id, formState, setFormState, errors, setErrors);
    };

    const displayInput = (input, i) => {
        const { _id, label, inputType, value, required } = input;
        if (inputType === 'text')
            return (
                <Fragment key={_id}>
                    <label htmlFor={_id}>
                        {label}
                        {/* {i + 1}. {label} */}
                        {required ? '*' : null}
                    </label>
                    <input
                        id={_id}
                        type={inputType}
                        value={value}
                        onChange={(e) => updateInput(e, _id)}
                        className={'form__input'}
                    />
                </Fragment>
            );
        if (inputType === 'textarea')
            return (
                <Fragment key={_id}>
                    <label htmlFor={_id}>
                        {label}
                        {required ? '*' : null}
                    </label>
                    <textarea
                        id={_id}
                        value={value}
                        onChange={(e) => updateInput(e, _id)}
                        className='ci--on-change'
                    />
                </Fragment>
            );
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const errArr = [];
        isRequired(formState, errArr);
        isValidated(formState, errArr);
        if (errArr.length > 0) {
            setErrors(errArr);
            return;
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = JSON.stringify(formState);
            const res = await axios.post(http, body, config);
            await cb();
            setAlert(msg, 'success', null, false);
            //stops prompt on form submition when updated
            if (updateInitStateToReduxStateOnSubmit)
                updateInitStateToReduxStateOnSubmit();
            //clear submitted data
            if (reset) setFormState(formState.map((i) => (i.value = '')));
            //redirect
            history.push(`${url}${res.data.id ? res.data.id : ''}`);
        } catch (err) {
            // if (err.response) {
            //     const { status, statusText } = err.response;
            //     setAlert(`${status} ${statusText}`, 'danger', null, false);
            // }
            console.log('ON CUSTOM FORM SUBMIT', err);
            if (err.response.data) {
                setErrors([...errors, ...err.response.data.errors]);
            }
        }
    };

    useEffect(() => {
        formErrorsStyling(errors);
    }, [errors]);

    const orderedFields = formState
        .filter((field) => field.order)
        .sort((a, b) => a.order - b.order);
    const customFields = formState
        .filter((field) => field.custom)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const textarea = formState.filter(
        (field) => field.inputType === 'textarea'
    );

    return (
        <form onSubmit={onSubmit} className='form form__submit'>
            <div>
                <fieldset>
                    <legend>
                        <span className='sr-only'>
                            Use this form to create or update the details of
                            this page.
                        </span>
                        * Regired fields.
                    </legend>
                    {orderedFields.map(displayInput)}
                    {customFields.map((el, i) =>
                        displayInput(el, (i = orderedFields.length + i))
                    )}
                    {textarea.map(displayInput)}
                    <button
                        className='btn btn--info'
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        Submit
                    </button>
                </fieldset>
                {errors.length > 0 && (
                    <FormErrorsDisplay errors={errors} label='Page main form' />
                )}
            </div>
            <div>
                <AddCustomFields
                    addCustomToFieldsFormState={addCustomToFieldsFormState}
                    maxPosition={formState.length}
                />
                {customFields.length > 0 && (
                    <RemoveCustomFields
                        customFields={customFields}
                        removeCustomFieldsFromFormState={
                            removeCustomFieldsFromFormState
                        }
                    />
                )}
            </div>
        </form>
    );
};

const mapDispatchToProps = {
    setAlert,
};
export default connect(null, mapDispatchToProps)(withRouter(CustomBuiltForm));
