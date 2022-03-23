# Proyect Hospital 

<!-- ... -->



# Specifications 

Hello team, as we talked in the meeting these are the requirements for the PET project.

### 1.	React with Redux (No optional)


a.	You can use TypeScript or Vanilla JavaScript, but remember that in the interview you will be asked about TypeScript, so maybe it is a good time for put it on practice.

b.	Use clean code (good practices), keep your project well structured. Use environmental variables, validate your fields, you can use thirty party libraries or create your own (it also implies to display correct error messages in case user type an incorrect data). Display appropriate message in case of the error comes from the server side, etc.

### 2.	Create a backend with connection to DB (Basic CRUD).

We suggest you to use mongodb, you can easily create an account in MongoAtlas, but you can use any other DB if you prefer. 

### Desired:
a.	User should not be able to consume the API without a valid token (JWT, previous login).

b.	Use clean code (good practices). Create an environmental file to store your sensitive information. Add validators to don’t accept wrong data in the API (like an email in the incorrect format, or empty string if they are not allowed), use try catch, etc.

c.	Password must be encrypted in the DB.
Optional: This option could be use just in case you really are struggling on create your own backend and you are running out of time.
a.	Used APIs already stored in the web (maybe firebase could be an option).



### 3.	The page should be responsive. 

a.	You want to use a thirty party library for it like bootstrap or any other library that could help you to make your page responsive.

b.	If you want to create your own CSS is up to you, just keep in mind that it is going to take you more time.


### 4.	Both projects (front-end and backed) should be stored in a repo (GITHUB)
 You can use your own account or the EPAM account for it. Remember to use .gitignore to avoid commit files with sensitive data.


Here is a list of tools that we think could help you to make your life easier 😊.


## General tools:
- Mongo Atlas (You can create an account here to create your mongodb db, collections, etc.).

NoSqlBooster (MongoDB IDE, you can used to create db,  query, create collections, etc. in - your mongo db).

- Postman (it will be useful to test your APIs).

- React Developer Tools (Browser extension, which help you to see the store data in React).

## Client tools:
Bootstrap (a CSS library with a lot of component already created that you can use easily, - and make your page responsive).

- react-datepicker (If you want to use a datepicker it is going to make your life easier).

- react-router-dom (It helps you to manage your navigation in the client side).

## Server tools:
moongose (A framework that could help you to connect and manage your collections, queries, - etc. in the backend side in an easy way).

- bcryptjs(to encrypt data).

- cors(To allow access to your APIs).

- dotenv(To manage environmental variables).

- express(Framework used with NodeJS which make easier the use of it).

- express-validator(To add APIs validations).

- jsonwebtoken(To manage tokens).

    Remember that you would do a demo of your pet project so prepare yourself to be able to explain all the implementation and why you did it in that way.

