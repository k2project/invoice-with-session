import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/messages';
import {
    sortInputsByNamesAlphabeticaly,
    getInputValueByLabel,
} from '../form/utils/customFormQueries';

const NavSubmenu = ({ companies }) => {
    companies = sortInputsByNamesAlphabeticaly(companies);
    useEffect(() => {
        //grade sublink bg shade
        //orange color rgb: (235,147,70)
        const subLinks = document.querySelectorAll('.dashboard-subnav__link ');
        const max = subLinks.length;
        Array.from(subLinks).forEach((el, index) => {
            let opacity = (max - index) / max + 0.1;
            el.style.backgroundColor = `rgba(235,147,70,${opacity})`;
        });
        //show links when url -> /dashboard/companies/
        if (/^\/dashboard\/companies/.test(window.location.pathname)) {
            subLinks.forEach((link, index) => {
                link.style.display = 'flex';
                link.style.opacity = 0;
                link.style.top = `-40px`;
                setTimeout(() => {
                    link.style.top = '0px';
                    link.style.opacity = 1;
                }, index * 100);
            });
        } else {
            subLinks.forEach((link) => (link.style.display = 'none'));
        }
    });

    return (
        <ul
            className='dashboard-subnav__list'
            aria-label='companies list - dashboard submenu'
        >
            {companies.map((company) => {
                const { _id, details } = company;
                const name = getInputValueByLabel(details, 'Name');
                return (
                    <li key={_id}>
                        <Link
                            to={`/dashboard/companies/${_id}`}
                            className='dashboard-subnav__link tile '
                            activeClassName='dashboard-subnav__link--is-active'
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                setAlert(
                                    `${name} is now desplayed on the page `,
                                    'success'
                                );
                            }}
                        >
                            {name}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

NavSubmenu.propTypes = {
    companies: PropTypes.array,
};

const mapStateToProps = (state) => ({
    companies: state.companies.companies,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavSubmenu);
