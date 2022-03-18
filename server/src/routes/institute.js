const router = require("express").Router();

// User Controller
const {
  createInstitute,
  getAllInstitutes,
  getSingleInstitute,
  getTopTenInstitutes,
} = require("../controllers/institute");

// User middleware
const { isLoggedIn, customRole } = require("../middlewares/user");

// Institute
router.route("/create").post(isLoggedIn, customRole("admin"), createInstitute);

router.route("/").get(isLoggedIn, getAllInstitutes);
router.route("/top-ten").get(isLoggedIn, getTopTenInstitutes);

router.route("/:id").get(isLoggedIn, getSingleInstitute);

module.exports = router;
