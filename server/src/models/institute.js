const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "An Institute must have a name"],
      trim: true,
      maxlength: [50, "Name must be less than 50 characters"],
    },
    location: {
      type: String,
      required: [true, "An Institute must have a location"],
      trim: true,
      maxlength: [50, "Location must be less than 50 characters"],
    },
    description: {
      type: String,
      required: [true, "An institute must have a description"],
      trim: true,
      maxlength: [1000, "Description must be less than 1000 characters"],
    },
    rank: {
      type: Number,
      required: [true, "A institute must have a rank"],
    },
    website: {
      type: String,
      required: [true, "A institute must have a website"],
      trim: true,
    },
    applicationIsOpen: {
      type: Boolean,
      default: false,
      required: true,
    },
    applicationUrl: {
      type: String,
      required: [true, "A institute must have a applicationUrl"],
      trim: true,
    },
    examAccepted: {
      type: String,
      default: "Jee Mains",
      required: true,
      enum: {
        values: ["Jee Mains", "Jee Advance", "Self"],
        message: "Please select from this category",
      },
    },
    fee: {
      type: Number,
      required: [true, "An Institute must have a fee"],
    },
    helplineNumber: {
      type: Number,
      required: [true, "An Institute must have a helplineNumber"],
    },
    helplineMail: {
      type: String,
      required: [true, "An Institute must have a helplineMail"],
      trim: true,
    },
    type: {
      type: String,
      default: "Government",
      enum: {
        values: ["Government", "Semi Government", "Private", "Autonomous"],
        message: "Please select from this category",
      },
    },
    hostelAvailable: {
      type: Boolean,
      default: false,
      required: true,
    },
    lateralEntry: {
      type: Boolean,
      default: false,
      required: true,
    },
    avgPackage: {
      type: Number,
      required: [true, "An Institute must have a avgPackage"],
    },
    category: {
      type: String,
      default: "College",
      required: true,
      enum: {
        values: ["College", "University"],
        message: "Please select from this category",
      },
    },
    scholarship: {
      type: Boolean,
      default: false,
      required: true,
    },
    seats: {
      sc: {
        type: Number,
        required: [true, "An Institute must have seats for sc"],
      },
      st: {
        type: Number,
        required: [true, "An Institute must have seats for st"],
      },
      obc: {
        type: Number,
        required: [true, "An Institute must have seats for obc"],
      },
      general: {
        type: Number,
        required: [true, "An Institute must have seats for general"],
      },
      foreigner: {
        type: Number,
        required: [true, "An Institute must have seats for foreigner"],
      },
      girls: {
        type: Number,
        required: [true, "An Institute must have seats for girls"],
      },
    },
    images: [
      {
        id: {
          type: Number,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Exporting Model
module.exports = mongoose.model("Institute", instituteSchema);
