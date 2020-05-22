import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inputOnChange, checkboxOnChange } from '../utils/formFuns';

const FormInput = ({
    type = 'text',
    name,
    size = 'sml',
    children,
    form,
    defaultValue,
}) => {
    const onChange = (e) => {
        inputOnChange(e, form.formData, form.setFormData);
    };
    const handleCheckboxOnChange = (e) => {
        checkboxOnChange(e, form.formData, form.setFormData);
    };

    switch (type) {
        case 'checkbox':
            return (
                <Fragment>
                    <div className='input-checkbox'>
                        <label htmlFor={name}>{children}</label>
                        {form.formData.showAcronym && (
                            <input
                                type={type}
                                name={name}
                                id={name}
                                onChange={handleCheckboxOnChange}
                                className={'form__input'}
                                onMouseDown={(e) => e.preventDefault()}
                                checked
                            />
                        )}
                        {!form.formData.showAcronym && (
                            <input
                                type={type}
                                name={name}
                                id={name}
                                onChange={handleCheckboxOnChange}
                                className={'form__input'}
                                onMouseDown={(e) => e.preventDefault()}
                            />
                        )}
                        <span className='input-checkbox__checkmark'></span>
                    </div>
                </Fragment>
            );
        case 'textarea':
            return (
                <Fragment>
                    <label htmlFor={name}>{children}</label>
                    <textarea
                        name={name}
                        id={name}
                        onChange={onChange}
                        className='txtarea txtarea--md'
                        value={form.formData[name] || ''}
                    />
                </Fragment>
            );
        case 'text':
        default:
            return (
                <Fragment>
                    <label htmlFor={name}>{children}</label>
                    <input
                        type={type}
                        name={name}
                        id={name}
                        onChange={onChange}
                        className={'form__input form__input--' + size}
                        value={form.formData[name] || ''}
                    />
                </Fragment>
            );
    }
};

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
};

export default FormInput;
