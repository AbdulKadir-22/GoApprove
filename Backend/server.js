// server.js (main entry)
const dotenv = require("dotenv");
dotenv.config(); // must run before anything uses process.env

const connectDB = require("./src/config/db");
const app = require("./src/index");

// connectDB();

const PORT = process.env.PORT || 3000;
const appName = process.env.APP_NAME || "GoApprove";

app.listen(PORT, () => {
  console.log(`${appName} is running on http://localhost:${PORT}`);
});
