# Table of Contents
  
## *Greetings Webbapp*
  
  *Istallations*

  - Setup an ExpressJS server instance

  - Install the package.json

  - Install dependencies on the Terminal

  - Configa Modules on Atom editor

  - Connect to the database by istalling and using MongoDB with mangoose module.

  - Register on MLAB for data.
  
      - Create MongoDB connection URL configurable using an environment variable.
      
      - Add an Config `Variable` under the Settings tab. Enter a `key` and `value`.
      
      - The key should be, MONGO_DB_URL the value should be something like, mongodb://<mongo_username>:<mongo_password>@yourinstance.mlab.com:62059/db-name

  ## *Greetings Forms*
    
  - Create a route should be called /greetings and accepts the username as part of the URL.
  
  - It should greet any user to use the route like this http://localhost:3000/greetings/Joe.
  
  - Create a route called /greeted that displays a list of all the users that have been greeted.
  
  - Create a route called /counter/<USER_NAME> that shows how many times a user has been greeted.
  
  - Create a web form that allows you to enter a name and when the submit button is pressed display a greeting massage with a user entered on a text box.

  - Create some basic styling to the page to look impresive.
  
  - Setup a folder for static resources using `express.static`.
  
  - Enable Form variables `body-parser` this enables form parameters retrieval using `req.body`.
  
  - Add radio buttons for the user to be greeted in different languages.

  - The radio buttons needs the same `name` attribute to work together. 
  
  - Each radio button needs a unique `value` attribute.
  
  - Use HTML form elements to be able create the web form.
  
  ## *Deploymenent*
  
  - Deploy the Applicaton usong `Heroku`
  
  
