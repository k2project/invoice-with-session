export const getInputObjById = (arr, id) => {
    return arr.find((input) => input._id === id);
};

export const getInputValueByLabel = (arr, l) => {
    return arr.find((input) => input.label === l).value;
};

//arr1 -> obj with arr2 ( obj with value property  that position in arr2 chnages dinamicaly )
export const sortInputsByNamesAlphabeticaly = (arr) => {
    //get all names and sort them alphabeticaly
    const arrAllNames = [];
    arr.forEach((el) => {
        arrAllNames.push(getInputValueByLabel(el.details, 'Name'));
    });
    arrAllNames.sort((a, b) => a.localeCompare(b));
    //index the arrays
    const arrWithIndex = [];
    arr.forEach((el) => {
        const indexInSortedArr = arrAllNames.indexOf(
            getInputValueByLabel(el.details, 'Name')
        );
        arrWithIndex.push({ el, indexInSortedArr });
    });
    //sort the arrays according to their indexes
    arrWithIndex.sort((a, b) => a.indexInSortedArr - b.indexInSortedArr);
    //drop the index and return original arr
    return arrWithIndex.map((el) => el.el);
};
