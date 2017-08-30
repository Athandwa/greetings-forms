const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');


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

app.get("/greeted",function(req,res) {
  var greetedNames = req.body.greetedNames;

    var greeted = [];
    for (name in namesGreeted){
      greeted.push(namesGreeted[name]);
    }
    console.log(namesGreeted);
        greetedNames: greeted
  res.render("greeted");
});


app.post("/",function(req,res){
  var greetedUser = req.body.name;
  var language = req.body.language;
  var greetMassage = "";
  // var existingName = false;

  if (language === "English") {
      greetMassage = "Hello " + greetedUser;
  }else if (language === "Afrikaans") {
      greetMassage = "Halo " + greetedUser;
  }else if (language === "Xhosa") {
      greetMassage = "Molo " + greetedUser;
  }
  res.render("home", {
    display: greetMassage
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server running at http://localhost:"+port+"/");
});
