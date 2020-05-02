const express = require('express');
const companiesRoutes = express.Router();
const Company = require('../models/Company');
const auth = require('../utils/auth');

//@route    GET api/companies/
//@desc     Get all companies by user
//@status   Private
companiesRoutes.get('/', auth, async (req, res) => {
    try {
        const companies = await Company.find({ user: req.session.userID });
        res.json(companies);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error ---> getting all companies');
    }
});
//@route    POST api/companies/
//@desc     Create a new company
//@status   Private
companiesRoutes.post('/', auth, async (req, res) => {
    const nameInput = req.body.find((input) => input.label === 'Name');
    try {
        let company = await Company.findOne({
            user: req.session.userID,
            'details.label': 'Name',
            'details.value': nameInput.value,
        });
        if (company) {
            return res.status(400).json({
                errors: [
                    {
                        msg:
                            'Company already exists. Please update the existing one or change the name.',
                        param: nameInput._id,
                    },
                ],
            });
        }

        company = new Company({
            user: req.session.userID,
            details: req.body,
            tasks: [],
        });
        await company.save();
        //return company's id for redirection to the company's page
        res.json({ id: company._id });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error ---> updating the company');
    }
});
//@route    POST api/companies/details/:companyID
//@desc     Update a company details
//@status   Private
companiesRoutes.post('/details/:companyID', auth, async (req, res) => {
    try {
        let company = await Company.findOne({
            _id: req.params.companyID,
        });

        company.details = req.body;
        await company.save();
        //return company's id for redirection to the company's page
        res.json({ id: company._id });
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send('Server error ---> updating the company details');
    }
});
//@route    POST api/companies/tasks/:companyID
//@desc     Update all tasks on autosave
//@status   Private
companiesRoutes.post('/tasks/:companyID', auth, async (req, res) => {
    try {
        let company = await Company.findOne({
            _id: req.params.companyID,
        });

        company.tasks = req.body;
        await company.save();
        //return company's id for redirection to the company's page
        res.json({ id: company._id });
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .send('Server error ---> updating the company tasks');
    }
});
//@route    POST api/companies/task/:companyID
//@desc     Add/Update a task
//@status   Private
companiesRoutes.post('/task/:companyID', auth, async (req, res) => {
    try {
        let company = await Company.findOne({
            _id: req.params.companyID,
        });

        const { tasks } = company;
        const indexOfTask = Number(
            tasks.findIndex((task) => task._id === req.body._id)
        );
        if (indexOfTask === -1) {
            tasks.push(req.body);
        } else {
            tasks.splice(indexOfTask, 1, req.body);
        }
        company.tasks = tasks;
        await company.save();
        res.end();
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error ---> adding/updating a task');
    }
});
//@route    PUT api/companies/task/:companyID
//@desc     Delete a task
//@status   Private
companiesRoutes.put('/task/:companyID', auth, async (req, res) => {
    try {
        let company = await Company.findOne({
            _id: req.params.companyID,
        });

        const { tasks } = company;
        const indexOfTask = Number(
            tasks.findIndex((task) => task._id === req.body.id)
        );
        if (indexOfTask === -1) {
            return res.status(400).send("Couldn't find the task to delete.");
        } else {
            tasks.splice(indexOfTask, 1);
        }
        company.tasks = tasks;
        await company.save();
        res.end();
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error ---> adding/updating a task');
    }
});
//@route    DELETE api/companies/:company_id
//@desc     Delete company from user's profile
//@status   Private
companiesRoutes.delete('/:company_id', auth, async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.company_id);
        res.json(company);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = companiesRoutes;
