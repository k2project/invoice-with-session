const { v4: uuidv4 } = require('uuid');
const profileInitDetails = (email) => [
    {
        _id: uuidv4(),
        label: 'Name',
        value: '',
        addToInvoice: true,
        custom: false,
        inputType: 'text',
        required: true,
        order: 1,
    },
    {
        _id: uuidv4(),
        label: 'Email',
        value: email,
        addToInvoice: true,
        custom: false,
        inputType: 'text',
        validate: {
            type: 'isEmail',
            msg: 'Please enter a valid email address in format xxxx@xxx.xxx .',
        },
        order: 2,
    },
    {
        _id: uuidv4(),
        label: 'Phone',
        value: '',
        addToInvoice: true,
        custom: false,
        inputType: 'text',
        order: 3,
    },
    {
        _id: uuidv4(),
        label: 'Address Line 1',
        value: '',
        addToInvoice: true,
        custom: false,
        inputType: 'text',
        order: 4,
    },
    {
        _id: uuidv4(),
        label: 'Address Line 2',
        value: '',
        addToInvoice: true,
        custom: false,
        inputType: 'text',
        order: 5,
    },
    {
        _id: uuidv4(),
        label: 'City',
        value: '',
        addToInvoice: true,
        custom: false,
        inputType: 'text',
        order: 6,
    },
    {
        _id: uuidv4(),
        label: 'County',
        value: '',
        addToInvoice: true,
        custom: false,
        inputType: 'text',
        order: 7,
    },
    {
        _id: uuidv4(),
        label: 'Postcode',
        value: '',
        addToInvoice: true,
        custom: false,
        inputType: 'text',
        order: 8,
    },
    {
        _id: uuidv4(),
        label: 'Bank Name',
        value: '',
        addToInvoice: true,
        custom: false,
        inputType: 'text',
        order: 9,
    },
    {
        _id: uuidv4(),
        label: 'Sort Code',
        value: '',
        addToInvoice: true,
        custom: false,
        inputType: 'text',
        order: 10,
    },
    {
        _id: uuidv4(),
        label: 'Account Number',
        value: '',
        addToInvoice: true,
        custom: false,
        inputType: 'text',
        validate: {
            type: 'isNumber',
            msg: 'Account Number must contain only numerical values.',
        },
        order: 11,
    },
];
module.exports = {
    profileInitDetails,
};
