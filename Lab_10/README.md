CS-546 Lab 10
Authentication and Middleware
For this lab, we will be creating a basic server with a user sign-up and user login.  You will be storing a user's first name, last name, email address, hashed password and their role ("admin" or "user"). In addition, we will be creating a very basic logging middleware.

We will be using two new npm packages for this lab:

bcryptLinks to an external site.: a password hasing library. If you have problems installing that modules (since it uses C++ bindings), you can also try bcrypt.jsLinks to an external site., which has the same API but is written in 100% JS.
express-sessionLinks to an external site.: a simple session middleware for Express.
YOU MUST use the directory and file structure in the code stub, or points will be deducted. You can download the starter template here: Lab10_stub.zipDownload Lab10_stub.zip

PLEASE NOTE: THE STUB DOES NOT INCLUDE THE PACKAGE.JSON FILE. YOU WILL NEED TO CREATE IT! DO NOT ADD ANY OTHER FILE OR FOLDER APART FROM PACKAGE.JSON FILE. DO NOT FORGET THE START COMMAND OR THE TYPE MODULE PROPERTY IN THE PACKAGE.JSON

Database Structure
You will use a database with the following structure:

The database will be called FirstName_LastName_lab10
The collection you use will be called users
A sample of the user schema as it will be stored in the database:

[
  { 
    _id: ObjectId("615f5211445eac188610ecbe"),
    firstName: 'Patrick',
    lastName: 'Hill',  
    emailAddress: 'phill@stevens.edu', 
    password: '$2b$16$Vm/Xqc.2eyi3y3IqewuhjOTXeoxt4SaN1dcAfPwEPUrzA5Kgm1HFW',
    role: 'admin'
  },
  { 
    _id: ObjectId("615f5211445eac188610ecc0"), 
    firstName: 'Aiden',
    lastName: 'Hill',
    emailAddress: 'aidenhill@gmail.com', 
    password: '$2b$16$SHQUG43PoIHoTHvkeDBczewvurYf3l.XKMRhrRomB.iVMcvldsq8m',
    role: 'user'
  }
];
You will have one data module in your data folder named: users.js that will only export two functions:

createUser(firstName, lastName, emailAddress, password, role)
You must do full input checking and error handling for the inputs in this function.  

All fields must be supplied or you will throw an error
For firstName, it should be a valid string (no empty spaces, should not contain numbers) and should be at least 2 characters long with a max of 25 characters. If it fails any of those conditions, you will throw an error.  
For lastName, it should be a valid string (no empty spaces, should not contain numbers) and should be at least 2 characters long with a max of 25 characters. If it fails any of those conditions, you will throw an error.  
emailAddress should be a valid email address format. example@example.com
The emailAddress should be case-insensitive. So "PHILL@STEVENS.EDU", "phill@stevens.edu", "Phill@StEvEnS.eDu" should be treated as the same emailAddress. 
YOU MUST NOT allow duplicate email addresses in the system. If the emailAddress supplied is already in the database you will throw an error stating there is already a user with that email address.
For the password, it must be a valid string (no empty spaces and no spaces but can be any other character including special characters) and should be a minimum of 8 characters long. If it fails any of those conditions, you will throw an error.  The constraints for password will be: There needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character:  for example:  Not valid: test123, test123$, foobar, tS12$ Valid: Test123$, FooBar123*, HorsePull748*%
For role, the ONLY two valid values are "admin" or "user". Your function can accept it in any case, but it should be stored as lowercase in the DB. If there is any other value supplied, throw an error.
In this function you will hash the password using bcrypt.  You will then insert the user's first name, last name, email address, hashed password and role into the database.

If the insert was successful, your function will return: {insertedUser: true}. 

checkUser(emailAddress, password)
You must do full input checking and error handling for the inputs in this function.  

Both emailAddress and password must be supplied or you will throw an error
emailAddress should be a valid email address format. example@example.com
The emailAddress should be case-insensitive. So "PHILL@STEVENS.EDU", "phill@stevens.edu", "Phill@StEvEnS.eDu" should be treated as the same emailAddress. 
For the password, it must be a valid string (no empty spaces and no spaces but can be any other character including special characters) and should be a minimum of 8 characters long. If it fails any of those conditions, you will throw an error. The constraints for password will be: There needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character:  for example:  Not valid: test123, test123$, foobar, tS12$ Valid: Test123$, FooBar123*, HorsePull748*%
In this function, after you validate the inputs you will:

Query the db for the emailAddress supplied, if it is not found, throw an error stating "Either the email address or password is invalid".
If the emailAddress supplied is found in the DB, you will then use bcrypt to compare the hashed password in the database with the password input parameter.
If the passwords match your function will return the following fields of the user: firstName, lastName, emailAddress, role which will be stored in the session from the route, (DO NOT RETURN THE PASSWORD!!!!)
If the passwords do not match, you will throw an error stating "Either the email address or password is invalid"
Routes
GET /
The root route of the application. This route will never be hit at all.  You will use a middleware function (described below) for this route. If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /protected route. If the user is NOT authenticated, you will redirect them to the GET /login route. Again, this route will never be accessed really, the middleware function will redirect based on the conditions above and as noted in the middleware section below. 

GET /login
This route of the application will render a view with a login form. The form will contain two inputs, one for the email address and one for the password. The form will be used to submit a POST request to the /login route on the server and must have an id of login-form. The input for the email address must have both a name and id of emailAddressInput and should be an input type of email. The input for the password must have both a name and id of passwordInput and should be an input type of password.

You will also have a link on this page that links to /register and has the text "Click here to register!"

Do not forget to use labels for your inputs! For the labels, you will use the method of using the for attribute referencing the id of the input it belongs to. You should have a label for both the emailAddress and password inputs referencing their id's in the for attribute of the label

An authenticated user should not ever see the login screen.

GET /register
This route will render a view with a sign-up form. The form will contain 5 inputs and one select (dropdown). For the inputs, you will have one for the First Name which is type text, one for the Last Name which is type text, one for the Email Address that is type email, one for Password with type of password, and one for Confirm Password with type of password (you will check to make sure the password and confirm passwords match via client-side validation and in the routes, you do not have to send/check both passwords to the data function)  For the select dropdown, you will have two options one that displays "Admin" with a value attribute of "admin" and one option that displays "User" with a value attribute of "user".

 The input for the First Name must have a name AND id of firstNameInput. The input for the Last Name must have a name AND id of lastNameInput. The input for the Email Address must have a name AND id of emailAddressInput.  The input for the password must have a name AND id of passwordInput. The input for the confirm password must have a name AND id of confirmPasswordInput. the input for role but have a name AND id of roleInput

The form will be used to submit the POST request to the /register route on the server and must have an id of registration-form. 

Do not forget to use labels for your inputs! For the labels, you will use the method of using the for attribute. You should have a label for ALL inputs on your form (First Name, Last Name, Email Address, Password, Confirm Password and Role) referencing the id's of the inputs in the for attribute of the label

You will also have a link on this page that links to /login and has the text "Already have an account? Click here to log-in"

An authenticated user should not ever see the sign-up screen.

POST /register
You must do full input checking and error handling for the inputs in the routes.  

You must make sure that firstNameInput, lastNameInput, emailAddressInput,  passwordInput, confirmPasswordInput, roleInput  are supplied in the req.body. If any are missing you will re-render the form with a 400 status code explaining to the user which fields are missing. 
For firstNameInput, it should be a valid string (no empty spaces, should not contain numbers) and should be at least 2 characters long with a max of 25 characters. If it fails any of those conditions, you will respond with an error and 400 status code.  
For lastNameInput, it should be a valid string (no empty spaces, should not contain numbers) and should be at least 2 characters long with a max of 25 characters. If it fails any of those conditions, you will respond with an error and 400 status code.  
emailAddressInput should be a valid email address format. example@example.com If it's not, you will respond with an error and 400 status code.  
For the passwordInput, it must be a valid string (no empty spaces and no spaces but can be any other character including special characters) and should be a minimum of 8 characters long. If it fails any of those conditions, you will throw an error.  The constraints for password will be: There needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character:  for example:  Not valid: test123, test123$, foobar, tS12$ Valid: Test123$, FooBar123*, HorsePull748*% If it doesn't meet those conditions, you will respond with an error and 400 status code.  
For confirmPasswordInput, you simply have to make sure that it's the same value as passwordInput, if it's not, you will respond with an error and 400 status code.  
For roleInput, the ONLY two valid values are "admin" or "user".  If it's not either value, you will respond with an error and 400 status code.  
If it fails the error checks, or your DB function throws an error,  you will render the sign-up screen once again, and this time showing an error message (along with an HTTP 400 status code) to the user explaining what they had entered incorrectly.

Making a POST request to this route you will call your createUser db function passing in the fields from the request.body. (You do not have to pass confirmPasswordInput to the DB function)

If your database function returns {insertedUser: true} you will then redirect the user to the /login page so they can log in. If your DB function does not return this but also did not throw an error (perhaps the DB server was down when you tried to insert) you will respond with a status code of 500 and error message saying "Internal Server Error"

POST /login
You must do full input checking and error handling for the inputs in the routes.  

You must make sure that emailAddressInput and passwordInput are supplied in the req.body if not, you will respond with an error and 400 status code.  
emailAddressInput should be a valid email address format. example@example.com, if not, you will respond with an error and 400 status code.
The emailAddressInput should be case-insensitive. So "PHILL@STEVENS.EDU", "phill@stevens.edu", "Phill@StEvEnS.eDu" should be treated as the same emailAddress. 
For the password, it must be a valid string (no empty spaces and no spaces but can be any other character including special characters) and should be a minimum of 8 characters long. If it fails any of those conditions, you will throw an error.  The constraints for password will be: There needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character:  for example:  Not valid: test123, test123$, foobar, tS12$ Valid: Test123$, FooBar123*, HorsePull748*% if not, you will respond with an error and 400 status code.
If it fails the error checks or your DB function throws an error, you will render the login screen once again, and this time showing an error message (along with an HTTP 400 status code) to the user explaining what they had entered incorrectly.

This route is simple: making a POST to this route will attempt to log a user in with the credentials they provide in the login form.

You will call your checkUser db function passing in the  emailAddressInput and passwordInput from the request.body. If your DB function returns the user (meaning the DB function found the user and the passwords match),  

You will have a cookie named AuthCookie (this is the name of the session in app.js). This cookie must be named AuthCookie or your assignment will receive a major point deduction.

You will store the following information about the user in the req.session.user property: the user's first name, the user's last name, the user's email address and the user's role.  for example: req.session.user= {firstName: "Patrick", lastName: "Hill", emailAddress: "phill@stevens.edu", role: "admin"}. You will then redirect them based on their role, if they are an admin, you will redirect them to /admin if they are a normal user, you will redirect them to /protected.

If the user does not provide a valid login, you will render the login screen once again, and this time show an error message (along with an HTTP 400 status code) to the user explaining that they did not provide a valid username and/or password.

GET /protected
This route will be simple, as well. This route will be protected your own authentication middleware to only allow valid, logged in users to see this page.

If the user is logged in, you will make a simple view that display: "Welcome {{firstName}}, the time is now: {{currentTime}}. Your role in the system is: {{role}}.". 

If they are an admin user, you will also display a link on this page to the /admin route (if they are not an admin user, they should not see this link at all!)

Also, you will need to have a hyperlink at the bottom of the page to /logout.

GET /admin
This route will be simple, as well. This route will be protected your own authentication middleware to only allow valid, logged in users who are admins to see this page.

If the user is logged in and they are an admin user, you will make a simple view that displays: "Welcome {{firstName}}, the time is now: {{currentTime}}. You get super secret admin access since you are an admin. Remember, with great power comes great responsibility". 

You will also display a link on this page to the /protected route so an admin can access the protected route if they desire. 

Also, you will need to have a hyperlink at the bottom of the page to /logout.

GET /logout
This route will expire/delete the AuthCookie and inform the user that they have been logged out. It will provide a URL hyperlink to the / route.

GET /error
This route will be used to render a view for any time you need to redirect to an error page.  Do not forget to render it with the correct status code and error message.  

Middlewares
You will have the following middleware functions:

1. This middleware will apply to the root route / and will do one of the following: If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /protected route. If the user is NOT authenticated, you will redirect them to the GET /login route. 

2. This middleware will only be used for the GET /login route and will do one of the following: If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /protected route. If the user is NOT authenticated, you will allow them to get through to the GET /login route. A logged in user should never be able to access the login form.

 3. This middleware will only be used for the GET /register route and will do one of the following: If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /protected route. If the user is NOT authenticated, you will allow them to get through to the GET /register route. A logged in user should never be able to access the registration form.

NOTE: You could do middleware 1,2 and 3 as a single middleware if you like with just more logic to determine the route being accessed and where you need to redirect them. So you can do it as three separate middleware functions or a single one.  

4. This middleware will only be used for the GET /protected route and will do one of the following:

If a user is not logged in, you will redirect to the GET /login route.
If the user is logged in, the middleware will "fall through" to the next route calling the next() callback.
Users with both roles admin or user should be able to access the /protected route, so you simply need to make sure they are authenticated in this middleware.
5. This middleware will only be used for the GET /admin route and will do one of the following:

If a user is not logged in, you will redirect to the GET /login route.
If a user is logged in, but they are not an admin user, you will redirect to /error and render a HTML error page saying that the user does not have permission to view the page, and the page must issue an HTTP status code of 403.
If the user is logged in AND the user has a role of admin, the middleware will "fall through" to the next route calling the next() callback.
ONLY USERS WITH A ROLE of admin SHOULD BE ABLE TO ACCESS THE /admin ROUTE!
6. This middleware will only be used for the GET /logout route and will do one of the following:

1. If a user is not logged in, you will redirect to the GET /login route.

2. if the user is logged in, the middleware will "fall through" to the next route calling the next() callback.

7. Logging Middleware

This middleware will log to your console for every request made to the server, with the following information:

Current Timestamp: new Date().toUTCString()
Request Method: req.method
Request Route: req.originalUrl
Some string/boolean stating if a user is authenticated
There is no precise format you must follow for this. The only requirement is that it logs the data stated above.

An example would be:

[Sun, 14 Apr 2019 23:56:06 GMT]: GET / (Non-Authenticated User)
[Sun, 14 Apr 2019 23:56:14 GMT]: POST /login (Non-Authenticated User)
[Sun, 14 Apr 2019 23:56:19 GMT]: GET /protected (Authenticated User)
[Sun, 14 Apr 2019 23:56:44 GMT]: GET / (Authenticated User)
See this referenceLinks to an external site. in the express documentation to read more about middleware.

Styling
You will create a CSS stylesheet in /public/css/lab10.css; this file should have at least 10 rulesets.  You will need to utilize all 10 rulesets on each of the pages (not every page has to use all 10 rulesets each but all 10 rulesets must be utilized by the various pages in your application).  So you can have some rulesets for one page, some for another page but there needs to be at least 10 total rulesets that are used between all the pages. 


Client-Side Validation For All Forms!

You will create a client-side Javascript file in /public/js/lab10.js.

In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

Using express-session
This middleware package does one (fairly simple) thing. It creates a cookie for the browser that will be used to track the current session of the user, after we verify their login. We will expand on the req.session field to store information about the currently logged in user. You can see an example using req.session hereLinks to an external site..

To initialize the middleware, you must do the following:

// Your app.js file

const session = require('express-session')

...

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: false
}))
You can read more about session's different configuration options hereLinks to an external site.. For the sake of this lab, the above configuration is all you will need.


Requirements
All previous lab requirements still apply.
You must remember to update your package.json file to set app.js as your starting script!
Your HTML must be validLinks to an external site. or you will lose points on the assignment.
Your HTML must make semantical sense; usage of tags for the purpose of simply changing the style of elements (such as i, b, font, center, etc) will result in points being deducted; think in terms of content first, then style with your CSS.
You can be as creative as you'd like to fulfill front-end requirements; if an implementation is not explicitly stated, however you go about it is fine (provided the HTML is valid and semantical). Design is not a factor in this course.
All inputs must be properly labeled!
All inputs should be trimmed!
