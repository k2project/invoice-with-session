function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isNumber(email) {
    return /^\d+$/.test(email);
}

export const isRequired = (state, outputArr) => {
    state.forEach((input) => {
        if (input.required && !input.value.trim()) {
            const error = {
                param: input._id,
                msg: `${input.label} is required.`,
            };
            outputArr.push(error);
        }
    });
};
export const isValidated = (state, outputArr) => {
    state.forEach((input) => {
        if (input.validate && input.value.trim()) {
            const { type, msg } = input.validate;
            let error = null;
            if (type === 'isEmail') {
                error = isEmail(input.value)
                    ? null
                    : {
                          param: input._id,
                          msg,
                      };
            }
            if (type === 'isNumber') {
                error = isNumber(input.value)
                    ? null
                    : {
                          param: input._id,
                          msg,
                      };
            }

            if (error) outputArr.push(error);
        }
    });
};

export const getNumericalValueFromString = (str) => {
    return str.replace(/[^0-9,.]/g, '');
};
export const strToNum = (str) => {
    return parseFloat(str.replace(/,/g, ''));
};

export const validateStringToPercentage = (str) => {
    const regExpPercentage = /^([0-9]{1,2}(\.[0-9]{1,2})?|100)\s?%?$/;
    if (regExpPercentage.test(str)) {
        return getNumericalValueFromString(str);
    }
    return null;
};
export const validateStringToCurrency = (str) => {
    const regExpCurrency = /^[^0-9]*[0-9]{1,3}(,?[0-9]{3})*(\.[0-9]{1,2})?[^0-9]*$/;
    if (regExpCurrency.test(str)) {
        const numValue = str.replace(/[^0-9,.]/g, '').trim();
        const currency = str
            .replace(numValue, '')
            .trim()
            .toUpperCase()
            .split(' ')[0];
        return {
            currency,
            numValue,
        };
    }
    return null;
};

export const validateStringToQty = (str) => {
    const regExpQty = /^[0-9]{1,3}(,?[0-9]{3})*(\.[0-9]{1,2})?[^0-9]*$/;
    if (regExpQty.test(str)) {
        return getNumericalValueFromString(str);
    }
    return null;
};
export const numberWithCommas = (num) => {
    num = (+num).toFixed(2);
    let n = String(num),
        p = n.indexOf('.');
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
        p < 0 || i < p ? `${m},` : m
    );
};
//format $1,000.99 or 'N/A' or 'FREE'
export const amountDisplay = (amount) => {
    // 'N/A' and 'FREE'
    if (typeof amount === 'string') return amount;
    //numerical value with commas and two digits after dot
    return amount.currency + numberWithCommas(amount.amountNet);
};
