const app = require("./app");
const connectDatabase = require("./db")
const dotenv = require("dotenv");

dotenv.config();

connectDatabase() 

// Connect to database before starting server

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
