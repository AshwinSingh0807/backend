const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => {
      console.log(
        `MongoDB connected to Database server: ${connection.connection.host}`
      );
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectDatabase;
