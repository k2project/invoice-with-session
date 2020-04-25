export function moveItemUpOrDown(e, direction, tableState, setTableState) {
    const btn = e.target.closest('button');
    const tr = btn.parentElement.parentElement;
    let trSibling = tr.previousElementSibling;
    if (direction === 'down') trSibling = tr.nextElementSibling;
    const margin = 2;
    const trIndex = tr.dataset.detailsIndex;
    const trSiblingIndex = trSibling.dataset.detailsIndex;

    tr.style.transform = `translateY(${direction === 'up' ? '-' : ''}${
        trSibling.getBoundingClientRect().height + margin
    }px)`;
    tr.style.transition = 'transform 0.5s ease-in-out';
    trSibling.style.transform = `translateY(${direction === 'up' ? '' : '-'}${
        tr.getBoundingClientRect().height + margin
    }px)`;
    trSibling.style.transition = 'transform 0.5s ease-in-out';

    setTimeout(() => {
        tableState.splice(trSiblingIndex, 0, tableState.splice(trIndex, 1)[0]);
        setTableState([...tableState]);
        tr.style.transition = 'none';
        trSibling.style.transition = 'none';
        tr.style.transform = `translateY(0px)`;
        trSibling.style.transform = `translateY(0px)`;
    }, 500);
}
