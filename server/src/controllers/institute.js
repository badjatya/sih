// Model
const Institute = require("../models/institute");

// Utils
const customError = require("../utils/customError");

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
    const institute = await Institute.create(req.body);

    res.json({
      status: "success",
      message: "Institute created successfully",
      institute,
    });
  } catch (error) {
    customError(res, 500, error.message, "error");
  }
};
