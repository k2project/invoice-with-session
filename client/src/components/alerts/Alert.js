import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeAlert } from '../../redux/actions/messages';

const Alert = ({ alerts, removeAlert }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
        <div
            key={alert.id}
            className={`alert alert--${alert.status} ${
                alert.hidden ? 'sr-only' : ''
            }`}
        >
            <div role='alert'>
                {alert.msg}
                {alert.redirection && (
                    <span className='sr-only'>
                        {`You have been redirected to ${alert.redirection}.`}
                    </span>
                )}
            </div>
            {!alert.hidden && (
                <button
                    className='alert__close'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => removeAlert(alert.id)}
                >
                    <span aria-hidden='true'>&times;</span>
                    <span className='sr-only'>Close alert</span>
                </button>
            )}
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
    removeAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    alerts: state.messages.alerts,
});
export default connect(mapStateToProps, { removeAlert })(Alert);
