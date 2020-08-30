const Product = require("./models/product")

Product.deleteMany()
    .exec()
    .then(() => {
        console.log("All products have been removed from the database.");
    });