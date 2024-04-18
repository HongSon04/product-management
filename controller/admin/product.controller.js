const filterStatusHelper = require("../../helpers/filterStatus");
const paginationHelper = require("../../helpers/pagination");
const searchHelper = require("../../helpers/search");
const Product = require("../../models/product.model");
// [GET] /admin/products
const index = async (req, res) => {
  // Filter
  const filterStatus = filterStatusHelper(req.query);

  // ? GET PRODUCT WHERE DELETED = FALSE
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }
  // ? Search
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // Pagination
  // let objectPagination = {
  //   currentPage: 1,
  //   limitItem: 4,
  // };
  const countProducts = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 4,
    },
    req.query,
    countProducts
  );
  // End Pagination

  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skipPage);
  res.render("admin/pages/products/index", {
    pageTitle: "Danh Sách Sản Phẩm",
    products,
    filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// [PUT] /admin/products/change-status/:status/:id
const changeStatus = async (req, res) => {
  const { id, status } = req.params;

  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái thành công");
  res.redirect("back");
};
// [PUT] /admin/products/change-multi
const changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash(
        "success",
        `${ids.length} sản phẩm đã được thay đổi trạng thái thành công`
      );
      res.redirect("back");
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `${ids.length} sản phẩm đã được thay đổi trạng thái thành công`
      );
      res.redirect("back");
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: Date.now() }
      );
      req.flash("success", `${ids.length} sản phẩm đã được xóa thành công`);
      res.redirect("back");
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash(
        "success",
        `${ids.length} sản phẩm đã được thay đổi vị trí thành công`
      );
      res.redirect("back");
      break;
    default:
      break;
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: Date.now() }
  );
  res.redirect("back");
};
// [GET] /admin/products/create
const create = (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm Sản Phẩm",
  });
};
// [POST] /admin/products/create
const storeProduct = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  req.body.deleted = false;
  const product = new Product(req.body);
  await product.save();
  req.flash("success", "Thêm sản phẩm thành công");
  res.redirect("/admin/products");
};

// [GET] /admin/products/edit/:id
const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const find = {
      _id: id,
      deleted: false,
    };
    const product = await Product.findById(find);
    res.render("admin/pages/products/edit", {
      pageTitle: "Chỉnh Sửa Sản Phẩm",
      product,
    });
  } catch (error) {
    req.flash("error", "Không tìm thấy sản phẩm");
    res.redirect("/admin/products");
  }
};
// [PATCH] /admin/products/update/:id
const update = async (req, res) => {
  try {
    const { id } = req.params;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    await Product.updateOne({ _id: id }, req.body);

    req.flash("success", "Cập nhật sản phẩm thành công");
    res.redirect("/admin/products");
  } catch (error) {
    req.flash("error", "Có lỗi xảy ra");
    res.redirect("/admin/products");
  }
};

// [GET] /admin/products/detail/:id
const detail = async (req, res) => {
  try {
    const { id } = req.params;
    const find = {
      _id: id,
      deleted: false,
    };
    const product = await Product.findById(find);
    res.render("admin/pages/products/detail", {
      pageTitle: "Chi Tiết Sản Phẩm",
      product,
    });
  } catch (error) {
    req.flash("error", "Không tìm thấy sản phẩm");
    res.redirect("/admin/products");
  }
};

module.exports = {
  index,
  changeStatus,
  changeMulti,
  deleteItem,
  create,
  storeProduct,
  edit,
  update,
  detail,
};
