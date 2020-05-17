import React from 'react';
import './InvoiceDoc.scss';
import InvoiceDocHeader from './InvoiceDocHeader';
import InvoiceDocRecepient from './InvoiceDocRecepient';
import InvoiceDocItems from './InvoiceDocItems';
import InvoiceDocFooter from './InvoiceDocFooter';

const InvoiceDoc = () => {
    return (
        <article id='invoice'>
            <InvoiceDocHeader />
            <InvoiceDocRecepient />
            <InvoiceDocItems />
            <InvoiceDocFooter />
        </article>
    );
};

export default InvoiceDoc;
