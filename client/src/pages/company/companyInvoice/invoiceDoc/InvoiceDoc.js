import React, { useState, useEffect } from 'react';
import './InvoiceDoc.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InvoiceDocHeader from './InvoiceDocHeader';
import InvoiceDocRecepient from './InvoiceDocRecepient';
import InvoiceDocItems from './InvoiceDocItems';
import InvoiceDocFooter from './InvoiceDocFooter';

const InvoiceDoc = ({ profile }) => {
    return (
        <article id='invoice'>
            <InvoiceDocHeader />
            <InvoiceDocRecepient />
            <InvoiceDocItems />
            <InvoiceDocFooter />
        </article>
    );
};

InvoiceDoc.propTypes = {};
const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps)(InvoiceDoc);
