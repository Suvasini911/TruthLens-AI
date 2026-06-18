const axios = require("axios");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "TruthLens Backend Running",
  });
});

app.post("/analyze-text", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/analyze",
      req.body
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AI Service Error",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});