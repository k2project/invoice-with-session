import React from 'react';
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
                {customFields.map((f) => (
                    <li key={f._id}>
                        <span>{f.label}</span>
                        <button
                            title='Remove Item'
                            className='btn btn--sqr'
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                removeCustomFieldsFromFormState(f._id);
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
