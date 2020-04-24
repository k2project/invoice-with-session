import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from '../../components/page/Page';

export const Company = ({ companies }) => {
    let { id } = useParams();
    const company = companies.find((c) => c._id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return <Page>{!company && <Redirect to='dashboard/companies' />}</Page>;
};
Company.propTypes = {};
const mapStateToProps = (state) => ({
    companies: state.companies.companies,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
