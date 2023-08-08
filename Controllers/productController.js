const product = require("../models/productModel");

exports.getProducts = (req, res) => {
    product
        .findAll()
        .then((products) => {
        res.json(products);
        })
        .catch((err) => console.log(err));
    }
    
    exports.postProduct = (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;
        const tags = req.body.tags;
        console.log(name + description + price + category + tags);
        product
          .create({
            name: name,
            description: description,
            price: price,
            category: category,
            tags: tags,
          })
          .then((result) => {
            console.log(result);
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }


      exports.updateProduct = (req, res) => {  // update product it requires id and all the fields 
        const id = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;
        const tags = req.body.tags;
        product
          .findByPk(id)
          .then((product) => {
            product.name = name;
            product.description = description;
            product.price = price;
            product.category = category;
            product.tags = tags;
            return product.save();
          })
          .then((result) => {
            res.json(result);
          })
          .catch((err) => console.log(err));
      }
      