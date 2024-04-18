// [GET] /

const index = (req, res) => {
  res.render("client/pages/home/index", {
    pageTitle: "Trang Chủ",
  });
};

module.exports = {
  index,
};
