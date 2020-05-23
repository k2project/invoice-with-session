import React from 'react';
import PropTypes from 'prop-types';
import errIcon from '../../../imgs/icons/errIcon.png';
//ERROR STRUCTURE
//{param:NAME || id , msg: text, index: num}

function FormErrorsDisplay({ errors, label }) {
    function onClick(e) {
        e.preventDefault();
        let id = e.target.getAttribute('href');
        id = id.slice(1).trim();
        document.getElementById(id).focus();
    }
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    errors = errors.filter(onlyUnique);
    const errList = errors.map((err, index) => {
        if (err.param) {
            return (
                <li key={err.param + index}>
                    <img src={errIcon} alt='' className='icon--sm' />
                    <a href={`#${err.param}`} onClick={onClick}>
                        <span className='sr-only'>Error:</span>
                        {err.msg}
                    </a>
                </li>
            );
        } else {
            return (
                <li key={err.param + index}>
                    <img src={errIcon} alt='' className='icon--sm' />
                    <span className='sr-only'>Error:</span>
                    {err.msg}
                </li>
            );
        }
    });

    return (
        <ul
            className='form__errs'
            role='alert'
            aria-label={`${label} errors list. Number of errors: ${errors.length}.`}
        >
            {errList}
        </ul>
    );
}

FormErrorsDisplay.propTypes = {
    errors: PropTypes.array.isRequired,
};

export default FormErrorsDisplay;
