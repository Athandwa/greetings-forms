const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/test";
// const mongoUrl = "mongodb://localhost/test";
const Models = require("./model");
const models = Models(mongoURL);


var app = express();

// setting rendering engine
app.engine("hbs",exphbs({
  defaultLayout:"main",
  extname:"hbs"
}));
app.use(express.static("public"));
app.use(express.static("views"))
app.use(form.urlencoded({
  extended:true
}));
app.set("view engine", "hbs")

app.get("/",function(req,res) {
  res.render("home");
});

var namesGreeted = [];
var index = [];

app.post("/",function(req, res, next){

  var greetedUser = req.body.name;
  var language = req.body.language;
  var greetMassage = "";

  if (language === "English") {
      greetMassage = "Hello " + greetedUser;
  }else if (language === "Afrikaans") {
      greetMassage = "Halo " + greetedUser;
  }else if (language === "Xhosa") {
      greetMassage = "Molo " + greetedUser;
  }
models.Users.create({
  name: greetedUser
}, function (err, person) {
  if (err) {
    if (err.code === 11000) {
      console.log("name already exist");
    }
    // return next(err)
  }
  else {
    models.Users.find({}, function (err, results) {
      if (err) {
        return next(err);
      }
      else {
        res.render("home", {
          display: greetMassage,
          counter: results.length
        });
        console.log(results.length);

      }
    })
  }
})
  // namesGreeted.push(greetedUser);
});

app.get('/greeted', function(req, res, next) {
  // res.send(namesGreeted);

  models.Users.find({}, function(err, results) {
   if (err) {
     return next(err);
   }
   else {
     res.render("greeted", {greeted: results});

   }

  console.log(namesGreeted);
  });
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server running at http://localhost:"+port+"/");
});
