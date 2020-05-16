# Restful Reservation

This is a NODE EXPRESS Back-End for an imaginary reservation system as part of the Data modeling and Back-End Development course. This document explains the routes, how to set-up them locally and how to test them with POSTMAN Desktop app.
Routes:

> The Express server is set up to listen on port 4000 and the base path
> for the API is '/reservations'. ie. localhost:4000/reservations/list

- _GET_ /list - list all reservations
- _GET_ /list with form data - list reservations filtered with criteria
- _POST_ /add Make a new reservation with form data
- _PUT_ /update/:id Update a specific event with form data provided
- _DEL_ /remove/:id Delete a specific reservation that matches the id given
- _PATCH_ /paidstatus/:id Change the "paid" status of a reservation matching the given ID
- _POST_ / login Using passport's local strategy, looks for matching user/password. Returns a msg object.

# DATABASE

Mlab has been used to host the database. Database has two collections: **Users** and **Reservations** Users only has one document which is the user we are using to test the functionality of the passport local login strategy. Local strategy is the easiest to implement, as it only compares user strings from a static database and no additional set-up is needed.

# POSTMAN

Since this project has no frontend, POSTMAN has been used to test the routes and the way the testing has been made easier for the reviewer, a JSON file is provided in this repository that can be imported as a POSTMAN collection. The collection has all routes and example form data. **Reservations** collection may - or may not have some ready made documents (records) as the functionalities of this application are demonstrated in a separate Youtube video for added convenience.

# INSTRUCTIONS

After you have pulled this repository, install all depencies with:

    npm install

after that, run the server with:

    node server.js

> **NOTE** Most of the codebase (models - or Data Schemas, are separate) is in one file, which isn't the most elegant solution but due to the "explorative" nature of this assignment, it
> just happened to gather up in one file. The code base might be further
> refined in future revision (this back-end will be re-used for another,
> front-end assignment.

In POSTMAN, you can find "Import" button right to the bright orange button thatr says "New" on the top-left corner of the POSTMAN Desktop Application.
