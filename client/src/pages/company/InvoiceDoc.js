import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInputValueByLabel } from '../../components/form/utils/customFormQueries';

const InvoiceDoc = ({ profile }) => {
    return (
        <article id='invoice'>
            <header className='bg'>
                <h1>invoice</h1>
            </header>
            {getInputValueByLabel(profile.details, 'Name')}
        </article>
    );
};

InvoiceDoc.propTypes = {};
const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps)(InvoiceDoc);
