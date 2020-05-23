import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/messages';
import { endSession } from '../../redux/actions/session';
import axios from 'axios';
import FormInput from '../../components/form/components/FormInput';
import FormErrorsDisplay from '../../components/form/components/FormErrorsDisplay';
import { formErrorsStyling } from '../../components/form/utils/formFuns';

const ChangePassword = ({ setAlert, endSession }) => {
    const handleCancelataion = () => {
        const inputs = document.querySelectorAll('.change-password-form input');
        Array.from(inputs).forEach((input) => {
            input.classList.remove('form__input--err');
            input.removeAttribute('aria-label');
        });
        setFormData(initState);
    };
    const changePassword = async (e) => {
        e.preventDefault();
        const {
            currentPassword,
            newPassword,
            newPasswordConfirmation,
        } = formData;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = JSON.stringify({
                currentPassword,
                newPassword,
                newPasswordConfirmation,
            });

            await axios.put('/api/user/change-password', body, config);
            endSession();
            setAlert(
                'Your password has been changed successfully. Please sign up with a new password.',
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
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
        errors: [],
    };
    const [formData, setFormData] = useState(initState);
    useEffect(() => {
        formErrorsStyling(formData.errors);
    }, [formData.errors]);
    return (
        <section className='change-password account'>
            <h2>Change your user password.</h2>
            <p>
                Make sure it's at least 7 characters including a number and an
                uppercase letter.
            </p>
            <p>
                Upon a successful update you will be redirected to the login
                page to sign in with the new credentials.
            </p>

            <form
                className='tile change-password-form'
                onSubmit={changePassword}
            >
                <FormInput
                    form={{ formData, setFormData }}
                    type='password'
                    name='currentPassword'
                >
                    Enter your current password.
                </FormInput>
                <FormInput
                    form={{ formData, setFormData }}
                    type='password'
                    name='newPassword'
                >
                    Enter a new password.
                </FormInput>
                <FormInput
                    form={{ formData, setFormData }}
                    type='password'
                    name='newPasswordConfirmation'
                >
                    Confirm the new password.
                </FormInput>
                <button
                    className='btn btn--info btn--sibling'
                    onMouseDown={(e) => e.preventDefault()}
                >
                    Change password
                </button>
                {(formData.currentPassword.length > 0 ||
                    formData.newPassword.length > 0 ||
                    formData.newPasswordConfirmation.length > 0) && (
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
                    label='Change password form'
                />
            )}
        </section>
    );
};

ChangePassword.propTypes = {
    setAlert: PropTypes.func,
    endSession: PropTypes.func,
};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
    setAlert,
    endSession,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
