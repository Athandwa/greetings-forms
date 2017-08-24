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

app.post("/",function(req,res){
  var massage = "Hello " + req.body.name;
  res.render("home", {
    display: massage
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server running at http://localhost:"+port+"/");
});
