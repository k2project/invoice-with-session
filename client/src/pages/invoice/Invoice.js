import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from '../../components/page/Page';

export const Invoice = () => {
    return <Page>invoice</Page>;
};

Invoice.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
