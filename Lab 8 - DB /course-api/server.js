const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const courseRouter = require("./routes/courseRouter");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Course API is running",
    endpoints: {
      listCourses: "GET /api/courses",
      getCourseById: "GET /api/courses/:id",
      createCourse: "POST /api/courses",
      updateCourse: "PUT /api/courses/:id",
      deleteCourse: "DELETE /api/courses/:id"
    }
  });
});

app.use("/api/courses", courseRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

async function startServer() {
  if (!mongoUri) {
    console.error("MONGODB_URI is missing. Add it to your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}

startServer();
