import React, { useState, useEffect, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FormInput from '../components/FormInput';
import FormErrorsDisplay from '../components/FormErrorsDisplay';
import { formErrorsStyling } from '../utils/formFuns';

export default function AddCustomFields({
    addCustomToFieldsFormState,
    maxPosition,
}) {
    const [formData, setFormData] = useState({
        customFieldLabel: '',
        customFieldValue: '',
        customFieldPosition: null,
        errors: [],
    });
    const handleAdd = async (e) => {
        e.preventDefault();
        const {
            customFieldLabel,
            customFieldValue,
            customFieldPosition,
        } = formData;
        const errors = [];
        if (!customFieldLabel.trim()) {
            const error = {
                param: 'customFieldLabel',
                msg: 'Please provide the label for the custom input.',
            };
            errors.push(error);
        }
        if (!customFieldValue.trim()) {
            const error = {
                param: 'customFieldValue',
                msg: 'Please provide the value for the custom input.',
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

        //create customised field
        const customField = {
            _id: uuidv4(),
            label: customFieldLabel,
            value: customFieldValue,
            position: customFieldPosition || ++maxPosition,
            addToInvoice: true,
            custom: true,
            inputType: 'text',
            createdAt: new Date(),
        };
        await addCustomToFieldsFormState(customField);
        //reset state
        setFormData({
            customFieldLabel: '',
            customFieldValue: '',
            customFieldPosition: null,
            errors: [],
        });
    };

    useEffect(() => {
        formErrorsStyling(formData.errors);
    }, [formData.errors]);
    return (
        <Fragment>
            <fieldset className='add-custom-fields'>
                <legend>
                    <b>Add a custom field.</b>
                </legend>
                <FormInput
                    form={{ formData, setFormData }}
                    name='customFieldLabel'
                    size='auto'
                >
                    Label / Description*
                </FormInput>
                <FormInput
                    form={{ formData, setFormData }}
                    name='customFieldValue'
                    size='auto'
                >
                    Value*
                </FormInput>
                <p>
                    You can determin the display position of the new field in
                    the details list.
                </p>
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
