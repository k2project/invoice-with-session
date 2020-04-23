export const dialogBox = async (msg, cb, targetEl, redirection) => {
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
            <div class="dialog-box__header" id="dialog-header">Confirm Dialog</div>
            <div class="dialog-box__body" id="dialog-body">
                <span class="sr-only">Confirm dialog. </span>
                Are you sure you want to ${msg}?
            </div>
            <div class="dialog-box__footer" >
                <button class="btn btn--grey btn--sibling" id="dialog-cancel">Cancel</button>
                <button class="btn btn--danger" id="dialog-confirm"> OK <span class="sr-only">,${msg}</span></button>
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
            targetEl.focus();
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
