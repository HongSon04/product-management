// [GET] /products

const Product = require("../../models/product.model");

const index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  const newProducts = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });

  res.render("client/pages/products/index", {
    pageTitle: "Sản Phẩm",
    products: newProducts,
  });
};

const detail = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({
      slug,
      status: "active",
      deleted: false,
    });

    res.render("client/pages/products/detail", {
      pageTitle: product.name,
      product,
    });
  } catch (error) {
    res.redirect("/products");
  }
};
module.exports = {
  index,
  detail,
};
