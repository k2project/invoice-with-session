import React, { useState, useEffect, Fragment } from 'react';
import './InvoiceDoc.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeInvoiceColors } from '../../../../redux/actions/invoice';
import settingsIcon from '../../../../imgs/icons/cogs.png';
import updateIcon from '../../../../imgs/icons/updateIcon.png';

const InvoiceDocHeader = ({ profile, invoice, changeInvoiceColors }) => {
    const [settings, setSettings] = useState(false);
    const profileDetails = profile.details.map((input) => {
        //Name displayed differently
        if (input.label === 'Name' && input.addToInvoice) {
            return (
                <li key={input._id}>
                    <b>{input.value}</b>
                </li>
            );
        }

        //exclude banking details from header
        const banking_details = ['Bank Name', 'Sort Code', 'Account Number'];
        if (input.addToInvoice && !banking_details.includes(input.label)) {
            return <li key={input._id}>{input.value}</li>;
        }
    });

    const BG_COLORS = [
        ['#000', 'black'],
        ['#5F7C8A', 'grey'],
        ['#785447', 'brown'],
        ['#F76B00', 'bright-orange'],
        ['#EB9346', 'orange'],
        ['#FFC108', 'yellow'],
        ['#CDDD39', 'yellow-green'],
        ['#8BC34A', 'light-green'],
        ['#4BAF50', 'green'],
        ['#009688', 'dark-green'],
        ['#01BCD5', 'see-blue'],
        ['#03A9F4', 'light-blue'],
        ['#2065A8', 'blue'],
        ['#203354', 'dark-blue'],
        ['#3F50B6', 'dark-purple'],
        ['#673BB7', 'purple'],
        ['#9C27B0', 'purple-pink'],
        ['#E91F63', 'pink'],
        ['#D5133A', 'dark-pink'],
        ['#F44337', 'red'],
    ];
    const bgColorPicker = BG_COLORS.map((color) => (
        <li
            key={'bg-color-picker-' + color[0]}
            style={{ backgroundColor: `${color[0]}` }}
            title={color[0]}
        >
            <button
                onClick={() =>
                    changeInvoiceColors([color[1], invoice.text_color])
                }
                onMouseDown={(e) => e.preventDefault()}
            >
                <span className='sr-only'>color[1]</span>
            </button>
        </li>
    ));
    const TXT_COLORS = [
        ['#FFF', 'white'],
        ['#000', 'black'],
    ];
    const txtColorPicker = TXT_COLORS.map((color) => (
        <li
            key={'txt-color-picker-' + color[0]}
            style={{ backgroundColor: `${color[0]}` }}
            title={color[0]}
        >
            <button
                onClick={() =>
                    changeInvoiceColors([invoice.bg_color, color[1]])
                }
                onMouseDown={(e) => e.preventDefault()}
            >
                <span className='sr-only'>color[1]</span>
            </button>
        </li>
    ));
    return (
        <Fragment>
            {settings && (
                <section className='color-picker'>
                    <section>
                        <h3 id='bg-color-picker'>
                            Choose invoice background colors theme.
                        </h3>
                        <ul aria-labelledby='bg-color-picker'>
                            {bgColorPicker}
                        </ul>
                    </section>
                    <section>
                        <h3 id='txt-color-picker'>Choose text color.</h3>
                        <ul aria-labelledby='txt-color-picker'>
                            {txtColorPicker}
                        </ul>
                    </section>
                    <button
                        className='close'
                        onClick={() => setSettings(false)}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        &times;
                    </button>
                </section>
            )}
            <header
                className={`bg-${invoice.bg_color} txt-${invoice.text_color}`}
            >
                <button
                    className='invoice__btn icon_iSettings'
                    title='Change invoice settings'
                    onClick={() => setSettings(true)}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <img src={settingsIcon} alt='Invoice settings' />
                </button>
                <div>
                    <h1>invoice</h1>
                    <b>#RTE-2020-04-00001</b>
                </div>
                <div className='txt--right'>
                    <button
                        className='invoice__btn'
                        title='Change Profile details'
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img src={updateIcon} alt='Change Profile details' />
                    </button>
                    <ul>{profileDetails}</ul>
                </div>
            </header>
        </Fragment>
    );
};

InvoiceDocHeader.propTypes = {
    profile: PropTypes.object,
    changeInvoiceColors: PropTypes.func,
    invoice: PropTypes.object,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
    invoice: state.invoice,
});
const mapDispatchToProps = {
    changeInvoiceColors,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDocHeader);
