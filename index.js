const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/test";
// const mongoUrl = "mongodb://localhost/test";
const Models = require("./model");
const models = Models(mongoURL);


var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000 * 30
    }
}));
app.use(flash());

// setting rendering engine
app.engine("hbs", exphbs({
    defaultLayout: "main",
    extname: "hbs"
}));
app.use(express.static("public"));
app.use(express.static("views"))
app.use(form.urlencoded({
    extended: true
}));
app.set("view engine", "hbs")

app.get("/", function(req, res) {
    res.render("home");
});

var namesGreeted = [];

app.get("/greeted/:name", function(req, res) {
    var name = req.params.name
    models.Users.findOne({
        name: name
    }, function(error, results) {
        if (error) {
            console.log(error);
        } else if (results) {
            console.log(results);
            res.render("timesGreeted", {
                name: results.name,
                counter: results.counter
            })
        }
    })
})

app.post("/", function(req, res, next) {

    var greetedUser = req.body.name;
    var language = req.body.language;
    var greetMassage = "";

    if (language === "English") {
        greetMassage = "Hello " + greetedUser;
    } else if (language === "Afrikaans") {
        greetMassage = "Halo " + greetedUser;
    } else if (language === "Xhosa") {
        greetMassage = "Molo " + greetedUser;
    }
    models.Users.create({
        name: greetedUser,
        counter: 1
    }, function(err, person) {
        if (err) {
            if (err.code === 11000) {
                req.flash("error", "Opps! The name already exist!");
            }
            res.redirect("/")

        } else {
            models.Users.find({}, function(err, results) {
                if (err) {
                    return next(err);
                } else {
                    res.render("home", {
                        display: greetMassage,
                        counter: results.length
                    });
                    console.log(results.length);
                }
            })
        }
    })
});

app.get('/greeted', function(req, res, next) {
    // res.send(namesGreeted);

    models.Users.find({}, function(err, results) {
        if (err) {
            return next(err);
        } else {
            res.render("greeted", {
                greeted: results
            });

        }
    });
});

app.post('/reset', function(req, res) {
    models.Users.remove({}, function(error, results) {
        if (error) {
            console.log(error);
        } else {
            console.log("data");
        }
        res.render("home");
    })
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server running at http://localhost:" + port + "/");
});
