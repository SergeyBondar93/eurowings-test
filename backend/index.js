const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const port = 3000;

const dataFolderPath = path.join(__dirname, "data");

app.get(
  "/promotions/priceoffers/ond/:origin/:destination",
  async (req, res) => {
    const { origin, destination } = req.params;

    try {
      const data = await fs.readFile(
        path.join(dataFolderPath, "filghts.json"),
        "utf8"
      );
      const jsonData = JSON.parse(data);

      /**
       * we can enable filtering on the server side,
       * it will be much better than doing it on the frontend side.
       */
      // const result = jsonData.filter(item => item.origin === origin && item.destination === destination);
      res.json(jsonData);
    } catch (err) {
      console.error("Error reading/parsing data:", err);
      res.status(500).json({ error: "Server error." });
    }
  }
);

app.get("/dictionary", async (req, res) => {
  const { type } = req.query;

  if (type === "airports") {
    try {
      // Read the data from "data.json" file using fs/promises
      const data = await fs.readFile(
        path.join(dataFolderPath, "airports.json"),
        "utf8"
      );
      const jsonData = JSON.parse(data);

      res.json(jsonData);
    } catch (err) {
      console.error("Error reading/parsing data:", err);
      res.status(500).json({ error: "Failed to read data." });
    }
  } else {
    res.status(400).json({ error: "Invalid type parameter." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
