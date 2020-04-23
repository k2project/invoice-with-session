import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from '../../components/page/Page';

export const Company = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return <Page>company</Page>;
};
Company.propTypes = {};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
