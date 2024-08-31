import express from "express";
const app = express();
const port = 5000;
app.listen(port, () => {
    return console.log(`server is running on port ${port}`);
});
app.get("/", (req, res) => {
    return res.status(200).json({ message: "well done!" });
});
