const router = require("express").Router();

// User Controller
const { createInstitute } = require("../controllers/institute");

// User middleware
const { isLoggedIn, customRole } = require("../middlewares/user");

// Institute
router.route("/create").post(isLoggedIn, customRole("admin"), createInstitute);

module.exports = router;
