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
export const numberWithCommas = (n) => {
    return n.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
