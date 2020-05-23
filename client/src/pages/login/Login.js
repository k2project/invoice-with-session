import React, { useEffect, useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { startSession } from '../../redux/actions/session';
import { setAlert } from '../../redux/actions/messages';
import Logo from '../../components/logo/Logo';
import FormInput from '../../components/form/components/FormInput';
import FormErrorsDisplay from '../../components/form/components/FormErrorsDisplay';
import { formErrorsStyling } from '../../components/form/utils/formFuns';

const Login = ({ startSession, setAlert }) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { email, password } = formData;
            const body = JSON.stringify({
                email,
                password,
            });
            const res = await axios.post('/api/user/login', body, config);
            startSession(res.data);
            setAlert('Login successful. ', 'success', 'dashboard');
        } catch (err) {
            console.log('LOGIN FORM ERR:', err);
            console.log(err.response);
            setFormData({
                ...formData,
                errors: err.response.data.errors,
            });
        }
    };
    const initState = {
        email: '',
        password: '',
        errors: [],
    };
    const [formData, setFormData] = useState(initState);
    useEffect(() => {
        formErrorsStyling(formData.errors);
    }, [formData.errors]);
    return (
        <main className='login' id='main'>
            <section className='login__bg'>
                <div className='cover cover--theme'>
                    <Logo />
                </div>
            </section>
            <section>
                <h1 className='sr-only'>Login</h1>
                <form className='login__form' onSubmit={onSubmit}>
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

                    <button
                        className='btn btn--form btn--theme'
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        Log in
                    </button>
                    {formData.errors.length > 0 && (
                        <FormErrorsDisplay
                            errors={formData.errors}
                            label='Register form'
                        />
                    )}
                </form>
                <p>
                    Need an account?{' '}
                    <Link to='/register' className='link--themed'>
                        Sign up
                    </Link>{' '}
                    now.
                </p>
            </section>
        </main>
    );
};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = { startSession, setAlert };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
