import encryptionService from "./services/encryption.service";
import authController from "./controllers/auth.controller";
import express from "express"
import dotenv from "dotenv"
import { Client, GatewayIntentBits } from 'discord.js';

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

const client: any = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction: any) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);