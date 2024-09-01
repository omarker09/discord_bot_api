import encryptionService from "./services/encryption.service";
import authController from "./controllers/auth.controller";
import express from "express"
import dotenv from "dotenv"
import { Client, GatewayIntentBits, Interaction } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = "qldj8QEEdK16NHx0-xJUBE_t6imHfNL_"

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login(token);

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
