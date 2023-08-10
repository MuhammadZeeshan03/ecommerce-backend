const product = require("../models/productModel");

exports.getProducts = (req, res) => {
  req.user
    .getProducts() // just because of association we can use getProducts
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};

exports.postProduct = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;
  const tags = req.body.tags;
  console.log(req.body.user)
  req.user
    .createProduct({
      // just because of association we can use createProduct
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
};

exports.updateProduct = async (req, res) => {
  // update product it requires id and all the fields
  const productId = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;
  const tags = req.body.tags;

  const productAddedByUser = await req.user.getProducts() // Can only update the products that are added by the user
  const userProduct = productAddedByUser.find((product) => product.id == productId)

  if (!userProduct) {
    return res.status(400).json({
      message: "You can only update the product that you have added",
    });
  }
  
  product
    .findByPk(productId)
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
};

exports.deleteProduct =async (req, res) => {
  const id = req.params.id;

  const productAddedByUser = await req.user.getProducts() // Can only update the products that are added by the user
  const userProduct = productAddedByUser.find((product) => product.id == id)

  if (!userProduct) {
    return res.status(400).json({
      message: "You can only delete the product that you have added",
    });
  }

  product
    .findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};