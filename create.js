const Product = require("./models/product");

console.log("OSOAOS")

Product.create({
    name: "Motor trifásico",
    picture: "/images/pump.jpg"
})

Product.findOne().then(product => console.log(product))