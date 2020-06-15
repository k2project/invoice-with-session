# invoice-with-session

Online application to create and store pdf-formatted invoices with user authentication.

# Motivation

I created this project to work on my full-stack programing skills. React was use to create the front-end components, including multiple custom-built forms and prompt. Redux allowes to mantain application advance state. The back-end, built using Node, Express and Mongo, takes advantage of well-developed RESTful API, and user authentication with cookie session. The pdf-formated file is genearted with window.print method and custom print styling, therefore for the best experience I would recomend using Chrome. 

# Screenchots/demo

![Screenshot](https://k2project.github.io/portfolio/static/media/invoice.32d9cf4f.png)

# Tech/frameworks used

### Built with:
-React
-Node/Express
-MongoDB/Mongoose
-Redux
-express-session
-Helmet


# Features

I did my best to make the features compliant with the WCAG accesibility standards.

The custom-built prompt detects unsaved changes to the forms by comparing component's states on mounting and dismounting with use of JSON methods for deep cloning. This way user is not needlessly concerned with a propmt if his actions bring back the component state to the initial. 

Forms allow to add and edit custom fileds.

Main form- INVOIVE - allows to change its appearance and update the content dinamically. 
