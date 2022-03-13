const router = require("express").Router();

// User Controller
const {
  createInstitute,
  getAllInstitutes,
} = require("../controllers/institute");

// User middleware
const { isLoggedIn, customRole } = require("../middlewares/user");

// Institute
router.route("/create").post(isLoggedIn, customRole("admin"), createInstitute);
router.route("/").get(isLoggedIn, getAllInstitutes);

module.exports = router;
