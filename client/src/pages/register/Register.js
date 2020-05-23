import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Register.scss';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/messages';
import Logo from '../../components/logo/Logo';
import FormInput from '../../components/form/components/FormInput';
import FormErrorsDisplay from '../../components/form/components/FormErrorsDisplay';
import { formErrorsStyling } from '../../components/form/utils/formFuns';

const Register = ({ setAlert, history }) => {
    const deleteAccount = async (e) => {
        e.preventDefault();
        const { email, password, password2 } = formData;
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = JSON.stringify({ email, password, password2 });
            await axios.post('api/user/register', body, config);
            //registered successefully
            setAlert(
                'Account hass been created successfully. Please sign in. ',
                'success',
                'login page',
                false
            );
            history.push('/');

            setFormData(initState);
        } catch (err) {
            console.log('REGISTER FORM ERR:', err);
            setFormData({
                ...formData,
                errors: err.response.data.errors,
            });
        }
    };
    const initState = {
        email: '',
        password: '',
        password2: '',
        errors: [],
    };
    const [formData, setFormData] = useState(initState);
    useEffect(() => {
        formErrorsStyling(formData.errors);
    }, [formData.errors]);
    return (
        <main className='register' id='main'>
            <section className='register'>
                <Logo />
                <h1 className='sr-only'>Register Your Account</h1>
                <form className='register-form' onSubmit={deleteAccount}>
                    <FormInput
                        form={{ formData, setFormData }}
                        type='email'
                        name='email'
                    >
                        Email
                    </FormInput>
                    <FormInput
                        form={{ formData, setFormData }}
                        type='password'
                        name='password'
                    >
                        Password
                    </FormInput>
                    <FormInput
                        form={{ formData, setFormData }}
                        type='password'
                        name='password2'
                    >
                        Password confirmation
                    </FormInput>

                    <button
                        className='btn btn--form btn--theme'
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        Create Account*
                    </button>
                </form>
                {formData.errors.length > 0 && (
                    <FormErrorsDisplay
                        errors={formData.errors}
                        label='Register form'
                    />
                )}
                <p>*The registration is free and only takes a minute.</p>
                <p>
                    Already have an account?{' '}
                    <Link to='/' className='link--themed'>
                        Sign in.
                    </Link>
                </p>
            </section>
        </main>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func,
};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
    setAlert,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Register));
