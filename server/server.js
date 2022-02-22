const express = require("express");
const app = express();
app.use(express.static("public"));

const PORT = process.env.PORT || 3001;

app.use("/static", express.static(__dirname + "./public"));

app.get("/", (req, res) => {
  res.json({ msg: "Hello from Express" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
