const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoute");
const taskRoutes = require("./routes/taskRoute");

const app = express();
app.use(cors({
    origin: 'https://taskflow-04k6.onrender.com',
    credentials: true
  }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
