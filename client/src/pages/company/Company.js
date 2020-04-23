import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Company = () => {
    return <div>company</div>;
};
Company.propTypes = {};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
