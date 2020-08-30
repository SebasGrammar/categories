const express = require("express"),
    app = express(),
    router = express.Router(),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    layouts = require("express-ejs-layouts"),
    Product = require("./models/product");
//errorController = require("./controllers/errorController"),
//homeController = require("./controllers/homeController"),
//Product = require("./models/product");

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://localhost:27017/tecnimotores",
    { useNewUrlParser: true }
);

mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3020);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

//app.get("/", homeController.index);

Product.deleteMany({})
    .exec()
    .then(() => {
        console.log("All products have been removed from the database.");
    });

Product.create({
    name: "Bomba",
    picture: "images/catalog/pump.jpg",
    tag: "pump"
})

Product.create({
    name: "Bomba",
    picture: "images/catalog/pump.jpg",
    tag: "motor"
})

Product.create({
    name: "Motorreductor",
    picture: "images/catalog/pump.jpg",
    tag: "motor_reducer"
})

app.get("/", function (req, res) {
    res.render("index");
})

/*************************************************************************/

// app.get("/products", function (req, res) {
//     Product.find({}) // a promise containing all elements associated to the Product model.
//         .then(products => {
//             res.render("../views/products", {
//                 products
//             })
//         })
//         .catch(error => {
//             console.log(`Error fetching users: ${error.message}`)
//             res.redirect("/");
//         });
// })

// app.get("/products", function (req, res) {
//     Product.find({tag: "pump"}) // a promise containing all elements associated to the Product model.
//         .then(products => {
//             res.render("../views/products", {
//                 products
//             })
//         })
//         .catch(error => {
//             console.log(`Error fetching users: ${error.message}`)
//             res.redirect("/");
//         });
// })

app.get("/products", function(req, res) {
    Product.find({})
        .then(products => {
            res.render("../views/products", {
                products
            })
        })
        .catch(error => {
            console.log(`Error fetching users: ${error.message}`)
            res.redirect("/");
        });
})

app.get("/products/:tag", function (req, res) {
    let tag = req.params.tag;
    Product.find({tag})
        .then(category => {
            res.render("../views/category", {
                category
            })
        })
        .catch(error => {
            console.log(`Error fetching users: ${error.message}`)
            res.redirect("/");
        });
})

/*************************************************************************/

//app.get("/products", homeController.products)

//app.get("/products", homeController.test)


// app.get("/", homeController.index);

//app.get("/", homeController.index);


// I'm going to use these . remove the comments.
// app.use(errorController.logErrors);
// app.use(errorController.respondNoResourceFound);
// app.use(errorController.respondInternalError);


app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});