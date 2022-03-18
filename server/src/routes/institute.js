const router = require("express").Router();

// User Controller
const {
  createInstitute,
  getAllInstitutes,
  getSingleInstitute,
  getTopTenInstitutes,
  getTopTenGovernmentInstitutes,
  getTopTenSemiGovernmentInstitutes,
  getTopTenPrivateInstitutes,
  uploadInstituteImages,
} = require("../controllers/institute");

// User middleware
const { isLoggedIn, customRole } = require("../middlewares/user");

// Institute Admin
router.route("/create").post(isLoggedIn, customRole("admin"), createInstitute);
router
  .route("/create/images/:id")
  .post(isLoggedIn, customRole("admin"), uploadInstituteImages);

// Logged in user
router.route("/").get(isLoggedIn, getAllInstitutes);
router.route("/top-ten").get(isLoggedIn, getTopTenInstitutes);
router
  .route("/top-ten-government")
  .get(isLoggedIn, getTopTenGovernmentInstitutes);
router
  .route("/top-ten-semi-government")
  .get(isLoggedIn, getTopTenSemiGovernmentInstitutes);
router.route("/top-ten-private").get(isLoggedIn, getTopTenPrivateInstitutes);

// Details route
router.route("/:id").get(isLoggedIn, getSingleInstitute);

module.exports = router;
