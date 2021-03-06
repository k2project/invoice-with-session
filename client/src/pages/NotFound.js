import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const companyQuery = /^\/dashboard\/companies/.test(
        window.location.pathname
    );
    return (
        <main id='main'>
            <section className='not-found'>
                <div className='wrapper'>
                    <div className='heading heading--xlg'>404</div>
                    <h1 className='heading heading--lg'>
                        {companyQuery ? 'Company ' : 'Page '} Not Found
                    </h1>
                    <Link
                        to={
                            companyQuery
                                ? '/dashboard/add-company'
                                : '/dashboard/profile?tab=details'
                        }
                        onMouseDown={(e) => e.preventDefault()}
                        className='not-found__link'
                    >
                        <span aria-hidden='true'>&#8592; </span>
                        Go back to the site
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default NotFound;
