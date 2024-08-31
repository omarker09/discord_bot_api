import encryptionService from "./services/encryption.service";
import authController from "./controllers/auth.controller";
import express from "express"
import dotenv from "dotenv"

const app = express();
const port = 5000;
dotenv.config();


app.listen(port, () => {
    return console.log(`server is running on port ${port}`);
})

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "well done!", discordToken: process.env.DISCORD_BOT_TOKEN
    })
})