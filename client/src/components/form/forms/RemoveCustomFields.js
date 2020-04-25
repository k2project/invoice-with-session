import React, { useEffect } from 'react';
import deleteIcon from '../../../imgs/icons/deleteIcon.png';

export default function RemoveCustomFields({
    customFields,
    removeCustomFieldsFromFormState,
}) {
    return (
        <fieldset>
            <legend>
                <b>Remove a custom field.</b>
            </legend>
            <ul aria-label='Custom fields list' className='remove-custom__list'>
                {customFields.map((field) => (
                    <li key={field._id}>
                        <span>{field.label}</span>
                        <button
                            title='Remove Item'
                            className='btn btn--sqr'
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                removeCustomFieldsFromFormState(field);
                            }}
                        >
                            <img src={deleteIcon} alt='Delete Item' />
                        </button>
                    </li>
                ))}
            </ul>
        </fieldset>
    );
}
