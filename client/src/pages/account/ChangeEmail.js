import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/messages';
import { endSession } from '../../redux/actions/session';
import axios from 'axios';
import FormInput from '../../components/form/components/FormInput';
import FormErrorsDisplay from '../../components/form/components/FormErrorsDisplay';
import { formErrorsStyling } from '../../components/form/utils/formFuns';

const ChangeEmail = ({ setAlert, endSession, user }) => {
    const handleCancelataion = () => {
        const inputs = document.querySelectorAll(
            '.change-email-account  input'
        );
        Array.from(inputs).forEach((input) => {
            input.classList.remove('form__input--err');
            input.removeAttribute('aria-label');
        });
        setFormData(initState);
    };
    const changeEmail = async (e) => {
        e.preventDefault();
        const { email } = formData;
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = JSON.stringify({ email });
            await axios.put('/api/user/change-email', body, config);
            endSession();
            setAlert(
                'Your email address has been changed successfully. Please sign up with a new email.',
                'success',
                'login page',
                false
            );
            setFormData(initState);
        } catch (err) {
            setFormData({
                ...formData,
                errors: err.response.data.errors,
            });
        }
    };
    const initState = {
        email: '',
        errors: [],
    };
    const [formData, setFormData] = useState(initState);
    useEffect(() => {
        formErrorsStyling(formData.errors);
    }, [formData.errors]);
    return (
        <section className='change-email-account account'>
            <h2>Change your user email ({user.email})</h2>
            <p>
                Upon a successful update you will be redirected to the login
                page to sign in with the new credentials.
            </p>
            <form className='tile delete-account-form' onSubmit={changeEmail}>
                <FormInput
                    form={{ formData, setFormData }}
                    type='email'
                    name='email'
                >
                    Enter your new email address.
                </FormInput>
                <button
                    className='btn btn--info btn--sibling'
                    onMouseDown={(e) => e.preventDefault()}
                >
                    Change email
                </button>
                {formData.email.length > 0 && (
                    <button
                        className='btn'
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleCancelataion}
                    >
                        Cancel
                    </button>
                )}
            </form>
            {formData.errors.length > 0 && (
                <FormErrorsDisplay
                    errors={formData.errors}
                    label='Change email form'
                />
            )}
        </section>
    );
};

ChangeEmail.propTypes = {
    setAlert: PropTypes.func,
    endSession: PropTypes.func,
};
const mapStateToProps = (state) => ({
    user: state.user,
});
const mapDispatchToProps = {
    setAlert,
    endSession,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail);
