import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/messages';
import { endSession } from '../../redux/actions/session';
import axios from 'axios';
import FormInput from '../../components/form/components/FormInput';
import FormErrorsDisplay from '../../components/form/components/FormErrorsDisplay';
import { formErrorsStyling } from '../../components/form/utils/formFuns';

const DeleteAccount = ({ setAlert, endSession }) => {
    const deleteAccount = async (e) => {
        e.preventDefault();
        const form = e.target;
        const { password } = formData;
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = JSON.stringify({ password });
            await axios.post('/api/user/unregister', body, config);
            endSession();
            setAlert(
                'Your account has been deleted successfully. We are sorry to see you going...',
                'success',
                'sign up page',
                false
            );
            setFormData({
                password: '',
                errors: [],
            });
        } catch (err) {
            setFormData({
                ...formData,
                errors: err.response.data.errors,
            });
        }
    };
    const [formData, setFormData] = useState({
        password: '',
        errors: [],
    });
    useEffect(() => {
        formErrorsStyling(formData.errors);
    }, [formData.errors]);
    return (
        <section className='delete-account account'>
            <h2>Delete your account.</h2>
            <p>
                Once you delete your account, there is no going back. Please be
                certain.
            </p>
            <form className='tile' onSubmit={deleteAccount}>
                <FormInput
                    form={{ formData, setFormData }}
                    type='password'
                    name='password'
                >
                    Enter password to confirm the deactivation of your account.
                </FormInput>
                <button
                    className='btn btn--danger btn--sibling'
                    onMouseDown={(e) => e.preventDefault()}
                >
                    Delete account
                </button>
                {formData.password.length > 0 && (
                    <button
                        className='btn'
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() =>
                            setFormData({
                                password: '',
                                errors: [],
                            })
                        }
                    >
                        Cancel
                    </button>
                )}
            </form>
            {formData.errors.length > 0 && (
                <FormErrorsDisplay
                    errors={formData.errors}
                    label='Delete account form'
                />
            )}
        </section>
    );
};

DeleteAccount.propTypes = {
    setAlert: PropTypes.func,
    endSession: PropTypes.func,
};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
    setAlert,
    endSession,
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
