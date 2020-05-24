import React from 'react';
import Page from '../../components/page/Page';
import './Help.scss';

export const Help = () => {
    return (
        <Page>
            <section className='help'>
                <h2 className='header header-sm'>
                    <b>Getting in touch</b>
                </h2>
                <p>
                    If you wish to contact me, please send me a message via{' '}
                    <a href='https://twitter.com/_k2project'>Twitter</a> or{' '}
                    <a href='https://github.com/k2project'>GitHub</a> account
                    and I will be more than happy to assist you with any
                    enqueries.
                </p>
            </section>
        </Page>
    );
};

export default Help;
