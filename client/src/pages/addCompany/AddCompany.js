import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from '../../components/page/Page';
import { companyInitDetails } from './companyInitDetails';
import CustomBuiltForm from '../../components/form/forms/CustomBuiltForm';
import { getAllCompanies } from '../../redux/actions/companies';
import infoIcon from '../../imgs/icons/infoIcon.png';

const AddCompany = ({ getAllCompanies }) => {
    const formData = {
        inputs: companyInitDetails,
        http: '/api/companies/',
        url: '/dashboard/companies/',
        cb: getAllCompanies,
        msg: 'A new company has been created successfully.',
        reset: true,
    };

    return (
        <Page title='Add Company Form.'>
            <div className='tile tile--info'>
                <img src={infoIcon} alt='' className='icon--md' />{' '}
                <h2>Create a new company.</h2>
            </div>
            <CustomBuiltForm data={formData} />
        </Page>
    );
};

AddCompany.propTypes = {
    getAllCompanies: PropTypes.func,
};

const mapDispatchToProps = {
    getAllCompanies,
};
export default connect(null, mapDispatchToProps)(AddCompany);
