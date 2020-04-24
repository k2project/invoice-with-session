import React from 'react';
import errIcon from '../../imgs/icons/errIcon.png';
//targetEl- el to focus on cancelation for sr
export const dialogBox = async (msg, cb, targetEl) => {
    const exist = document.getElementById('dialog');
    if (!exist) {
        let box = document.createElement('div');
        box.setAttribute('id', 'dialog');
        // box.setAttribute('role', 'dialog');
        // box.setAttribute('aria-labelledby', 'dialog-header');
        // box.setAttribute('aria-describedby', 'dialog-body');
        box.className = 'dialog';
        box.innerHTML = `
        <div class="dialog-box" aria-describedby="dialog-body" role="dialog">
            <div class="dialog-box__header sr-only" id="dialog-header">WARNING!</div>
            <div class="dialog-box__body" id="dialog-body">
                <img src="${errIcon}" alt=""/> ${msg}
            </div>
            <div class="dialog-box__footer" >
                <button class="btn btn--cancel" id="dialog-cancel">Cancel</button>
                <button class="btn btn--ok" id="dialog-confirm"> Proceed</button>
            </div>
        </div>
        `;
        document.body.append(box);
    }
    document.addEventListener('click', cancelDialog);
    document.addEventListener('click', confirmDialog);
    document.addEventListener('mousedown', mouseDownOnDialogBtns);

    function cancelDialog(e) {
        if (e.target.getAttribute('id') === 'dialog-cancel') {
            removeEvents();
            closeDialog();
            if (targetEl) targetEl.focus();
        }
    }
    function confirmDialog(e) {
        if (e.target.getAttribute('id') === 'dialog-confirm') {
            cb();
            removeEvents();
            closeDialog();
        }
    }
    function mouseDownOnDialogBtns(e) {
        if (
            e.target.getAttribute('id') === 'dialog-confirm' ||
            e.target.getAttribute('id') === 'dialog-cancel'
        ) {
            e.preventDefault();
        }
    }
    function removeEvents() {
        document.removeEventListener('click', cancelDialog);
        document.removeEventListener('click', confirmDialog);
        document.removeEventListener('mousedown', mouseDownOnDialogBtns);
    }
    function closeDialog() {
        document.getElementById('dialog').remove();
    }
};
