import React from 'react';
import PropTypes from 'prop-types';
import errIcon from '../../imgs/icons/errIcon.png';
//ERROR STRUCTURE
//{param:NAME || id , msg: text, index: num}

function FormErrorsDisplay({ errors, label }) {
    function onClick(e) {
        e.preventDefault();
        let id = e.target.getAttribute('href');
        id = id.slice(1).trim();
        document.getElementById(id).focus();
    }
    const arr = [];
    const errList = errors.map((err) => (
        <li key={err.param}>
            <img src={errIcon} alt='' className='icon--sm' />
            <a href={`#${err.param}`} onClick={onClick}>
                <span className='sr-only'>Error:</span>
                {err.msg}
            </a>
        </li>
    ));
    return (
        <ul
            className='form__errs tile tile--err'
            role='alert'
            aria-label={`${label} errors list. Number of errors: ${arr.length}.`}
        >
            {errList}
        </ul>
    );
}

FormErrorsDisplay.propTypes = {
    errors: PropTypes.array.isRequired,
};

export default FormErrorsDisplay;
