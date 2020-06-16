# invoice-with-session

Online application to create and store pdf-formatted invoices with user authentication.

# Motivation

I created this project to work on my full-stack programming skills. React was use to create the front-end components, including multiple custom-built forms and prompt. Redux allows maintaining application advance state. The back-end, built using Node, Express and Mongo, takes advantage of well-developed RESTful API, and user authentication with back-end generated cookie session. The pdf-formated file is created with window.print method and custom print styling, therefore for the best experience I would recommend using Chrome. 

# Screenshots
![Screenshot](/client/src/imgs/demo_login.png)
![Screenshot](https://k2project.github.io/portfolio/static/media/invoice.32d9cf4f.png)

# Tech/frameworks used

### Built with:
- React
- Node/Express
- MongoDB/Mongoose
- Redux
- express-session
- Helmet


# Features

The custom-built prompt detects unsaved changes to the forms by comparing component's states on mounting and dismounting with use of JSON methods for deep cloning. This way user is not needlessly concerned with a prompt if his actions bring back the component state to the initial.

Forms allow to add and edit custom fields.
Main form- CREATE INVOICE FORM - allows to change its appearance and update the content dynamically.

I made the application compliant with the WCAG accessibility standards.

# Demo

The application is hosted on [Heroku](https://invoice-pdf-generator.herokuapp.com) (free dyno).
