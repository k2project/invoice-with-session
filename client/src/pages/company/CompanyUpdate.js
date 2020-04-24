import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomBuiltForm from '../../components/form/forms/CustomBuiltForm';
import { getInputValueByLabel } from '../../components/form/utils/customFormQueries';
import { getAllCompanies } from '../../redux/actions/companies';

export const CompanyUpdate = ({ company, getAllCompanies }) => {
    let companyName = getInputValueByLabel(company.details, 'Name');

    const formData = {
        details: company.details,
        http: `/api/companies/${company._id}`,
        url: '/dashboard/companies/',
        cb: getAllCompanies,
        msg: `${companyName || 'Company'} has been updated successfully.`,
    };
    return <CustomBuiltForm data={formData} />;
};
CompanyUpdate.propTypes = {
    company: PropTypes.object.isRequired,
    getAllCompanies: PropTypes.func,
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    getAllCompanies,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyUpdate);
