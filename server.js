const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const {
    userRoutes,
    profileRoutes,
    companiesRoutes,
} = require('./server/routes/index');

require('dotenv').config();

const ONE_HR = 3.6e6;
const {
    PORT = 5000,
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET = 'ssh!my$ecr3t4thi$se££!0n',
    SESS_LIFETIME = ONE_HR,
} = process.env;
const IN_PROD = NODE_ENV === 'production';

(async () => {
    try {
        console.log('connecting to DB...');
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('DB connected');
        const app = express();
        // Serve the static files from the React app
        app.use(express.static(path.join(__dirname, 'client/build')));

        app.use(helmet());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json({ extended: false }));

        app.use(
            session({
                name: SESS_NAME,
                resave: false,
                saveUninitialized: false,
                secret: SESS_SECRET,
                store: new MongoStore({
                    mongooseConnection: mongoose.connection,
                    collection: 'session',
                    ttl: parseInt(SESS_LIFETIME) / 1000,
                }),
                rolling: true,
                cookie: {
                    maxAge: parseInt(SESS_LIFETIME),
                    sameSite: true,
                    secure: IN_PROD,
                },
            })
        );

        app.use('/api/user', userRoutes);
        app.use('/api/profile', profileRoutes);
        app.use('/api/companies', companiesRoutes);
        // Handles any requests that don't match the ones above
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/client/build/index.html'));
        });

        app.listen(PORT, () =>
            console.log(`Server is running on port ${PORT}`)
        );
    } catch (err) {
        console.error('CAN NOT CONNECT TO DB ', err);
        process.exit(1);
    }
})();
