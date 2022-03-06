const mongoose = require("mongoose");

exports.dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DATABASE CONNECTED"))
    .catch((error) => {
      console.log("DATABASE NOT CONNECTED");
    });
};
