// [GET] /admin/dashboard
const dashboard = (req, res) => {
  res.render("admin/pages/dashboard/index")
};

module.exports = {
  dashboard,
};
