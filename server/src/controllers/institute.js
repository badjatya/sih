// Model
const Institute = require("../models/institute");

// Lib
const cloudinary = require("cloudinary");

// Utils
const customError = require("../utils/customError");
const instituteQueryHandler = require("../utils/instituteQueryHandler");

// * ADMIN
// Creating a new Institute
exports.createInstitute = async (req, res) => {
  const {
    name,
    location,
    description,
    rank,
    website,
    applicationIsOpen,
    applicationUrl,
    examAccepted,
    fee,
    helplineNumber,
    helplineMail,
    type,
    hostelAvailable,
    lateralEntry,
    avgPackage,
    category,
    scholarship,
    seats,
  } = req.body;

  // Checking all the fields are present
  if (
    !name ||
    !location ||
    !description ||
    !rank ||
    !website ||
    !applicationIsOpen ||
    !applicationUrl ||
    !examAccepted ||
    !fee ||
    !helplineNumber ||
    !helplineMail ||
    !type ||
    !hostelAvailable ||
    !lateralEntry ||
    !avgPackage ||
    !category ||
    !scholarship ||
    !seats
  ) {
    return customError(
      res,
      400,
      "name, location, description, rank, website, applicationIsOpen, applicationUrl, examAccepted, fee, helplineNumber, helplineMail, type, hostelAvailable, lateralEntry, avgPackage, category, scholarship, and seats are required"
    );
  }

  try {
    const institute = await Institute.create({
      ...req.body,
      user: req.user._id,
    });

    res.json({
      status: "success",
      message: "Institute created successfully",
      institute,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// upload images
exports.uploadInstituteImages = async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);

    // Saving images to cloudinary
    let imageArray = [];
    // Uploading image based on single image or multiple image
    if (req.files.images.length !== undefined) {
      for (let index = 0; index < req.files.images.length; index++) {
        let result = await cloudinary.v2.uploader.upload(
          req.files.images[index].tempFilePath,
          {
            folder: "beducated/institutes",
          }
        );

        imageArray.push({
          id: result.public_id,
          url: result.secure_url,
        });
      }
    } else {
      let result = await cloudinary.v2.uploader.upload(
        req.files.images.tempFilePath,
        {
          folder: "beducated/institutes",
        }
      );

      imageArray.push({
        id: result.public_id,
        url: result.secure_url,
      });
    }

    // Saving images to db
    institute.images = imageArray;
    await institute.save();

    res.json({
      status: "success",
      message: "Institute images uploaded successfully",
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// update institute
exports.updateSingleInstitute = async (req, res) => {
  try {
    const institute = await Institute.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // If institute not found
    if (!institute) {
      return customError(res, 404, "Institute not found");
    }

    res.json({
      status: "success",
      message: "Institute updated successfully",
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// delete institute
exports.deleteSingleInstitute = async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);

    // If institute not found
    if (!institute) {
      return customError(res, 404, "Institute not found");
    }

    // Removing product image
    for (let index = 0; index < institute.images.length; index++) {
      // Deleting images
      await cloudinary.v2.uploader.destroy(institute.images[index].id);
    }

    await institute.remove();

    res.json({
      status: "success",
      message: "Institute deleted successfully",
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// * User
// Get all institutes
exports.getAllInstitutes = async (req, res) => {
  try {
    let institutes = new instituteQueryHandler(
      Institute.find({}).select([
        "_id",
        "name",
        "location",
        "type",
        "rank",
        "images",
      ]),
      req.query
    )
      .search()
      .filter();
    const totalInstitutes = await Institute.countDocuments();
    const totalProductPerPage = 20;

    institutes.pager(totalProductPerPage);
    institutes = await institutes.base;

    // response
    res.status(200).json({
      status: "success",
      total: totalInstitutes,
      result: institutes.length,
      institutes,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Get single institutes
exports.getSingleInstitute = async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);

    // If not found
    if (!institute) {
      return customError(res, 404, "Institute not found");
    }

    // response
    res.status(200).json({
      status: "success",
      institute,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Get top 10 institutes
exports.getTopTenInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find()
      .sort("rank")
      .select(["_id", "name", "location", "type", "images", "rank"])
      .limit(10);

    // response
    res.status(200).json({
      status: "success",
      institutes,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Get top 10 government institutes
exports.getTopTenGovernmentInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find({ type: "Government" })
      .sort("rank")
      .select(["_id", "name", "location", "type", "images", "rank"])
      .limit(10);

    // response
    res.status(200).json({
      status: "success",
      institutes,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Get top 10 semi government institutes
exports.getTopTenSemiGovernmentInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find({ type: "Semi Government" })
      .sort("rank")
      .select(["_id", "name", "location", "type", "images", "rank"])
      .limit(10);

    // response
    res.status(200).json({
      status: "success",
      institutes,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};

// Get top 10 private institutes
exports.getTopTenPrivateInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find({ type: "Private" })
      .sort("rank")
      .select(["_id", "name", "location", "type", "images", "rank"])
      .limit(10);

    // response
    res.status(200).json({
      status: "success",
      institutes,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};
