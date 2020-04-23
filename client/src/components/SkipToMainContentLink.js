import React from 'react';

function SkipToMainContentLink() {
    function scrollToHash(e) {
        e.preventDefault();
        const hash = e.target.getAttribute('href');
        document.querySelector(hash).scrollIntoView();
        e.target.blur();
    }
    function handleOnFocus(e) {
        e.target.classList.add('sr-only--in-focus');
    }
    function handleOnBlur(e) {
        e.target.classList.remove('sr-only--in-focus');
    }
    return (
        <a
            href='#main'
            className='sr-only sr-only--is-focusable'
            onClick={scrollToHash}
            tabIndex='0'
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
        >
            Skip to main content
        </a>
    );
}

export default SkipToMainContentLink;
