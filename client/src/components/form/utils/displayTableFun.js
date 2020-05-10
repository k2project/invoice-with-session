export function moveItemUpOrDown(
    e,
    direction,
    tableState,
    setTableState,
    updateState
) {
    const btn = e.target.closest('button');
    const tr = btn.parentElement.parentElement;
    let trSibling = tr.previousElementSibling;
    if (direction === 'down') trSibling = tr.nextElementSibling;
    const margin = 2;
    const trIndex = tr.dataset.detailsIndex;
    const trSiblingIndex = trSibling.dataset.detailsIndex;
    const trHeight = tr.getBoundingClientRect().height + margin;
    const trSiblingHeight = trSibling.getBoundingClientRect().height + margin;

    tr.style.transform = `translateY(${
        direction === 'up' ? '-' : ''
    }${trSiblingHeight}px)`;
    tr.style.transition = 'transform 0.5s ease-in-out';
    trSibling.style.transform = `translateY(${
        direction === 'up' ? '' : '-'
    }${trHeight}px)`;
    trSibling.style.transition = 'transform 0.5s ease-in-out';

    setTimeout(() => {
        tableState.splice(trSiblingIndex, 0, tableState.splice(trIndex, 1)[0]);
        setTableState([...tableState]);
        updateState([...tableState]);
        tr.style.transition = 'none';
        trSibling.style.transition = 'none';
        tr.style.transform = `translateY(0px)`;
        trSibling.style.transform = `translateY(0px)`;
    }, 500);
}
export function toggleIncludedInInvoice(
    index,
    tableState,
    setTableState,
    updateState
) {
    const item = tableState[index];
    item.addToInvoice = !item.addToInvoice;
    setTableState([...tableState]);
    updateState([...tableState]);
}

export function deleteItem(id, tableState, setTableState, updateState) {
    const index = tableState.findIndex((el) => el._id === id);
    tableState.splice(index, 1);
    setTableState([...tableState]);
    updateState([...tableState]);
}
