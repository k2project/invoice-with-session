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
            if (type == 'isEmail') {
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
