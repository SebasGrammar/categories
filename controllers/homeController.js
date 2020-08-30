app.get("/products", function (req, res) {
    Product.find({}) // a promise containing all elements associated to the Product model.
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