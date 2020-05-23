import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { startSession } from '../../redux/actions/session';

const Login = ({ authenticated, startSession }) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = JSON.stringify({
                email: 'me2@me.com',
                password: 'Qwert12345',
            });
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const res = await axios.post('/api/user/login', body, config);

            startSession(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Fragment>
            {!authenticated && (
                <main className='login' id='main'>
                    <form onSubmit={onSubmit}>
                        <button
                            type='submit'
                            className='btn btn--form btn--theme'
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            Sign In
                        </button>
                    </form>
                    <p className='p--sml'>
                        Need an account?{' '}
                        <Link to='/register'>Sign up now.</Link>
                    </p>
                </main>
            )}
        </Fragment>
    );
};
const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated,
});
const mapDispatchToProps = { startSession };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
