import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Invoice = () => {
    return <div>invoice</div>;
};

Invoice.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
