const valiteCreateProduct = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Tiêu đề sản phẩm không được để trống");
    return res.redirect("back");
  }
  if (req.body.title.length > 255) {
    req.flash("error", "Tiêu đề sản phẩm không được vượt quá 255 ký tự");
    return res.redirect("back");
  }
  if (req.body.title.length < 10) {
    req.flash("error", "Tiêu đề sản phẩm không được ít hơn 10 ký tự");
    return res.redirect("back");
  }
  next();
};

module.exports = { valiteCreateProduct };
