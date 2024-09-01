import express from "express"
import dotenv from "dotenv"
import { Client, GatewayIntentBits, Interaction, IntentsBitField } from 'discord.js';
import { NinjaAPI } from "./services/ninja.api.js";
import { GeminiAI, GeminiAiTypes } from "./services/gemini.ai.js";

dotenv.config();

const token = process.env.DISCORD_BOT_TOKEN

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on("ready", (c) => {
    console.log(`the boot is ready. ${c.user.tag}`);
})

client.on("messageCreate", async (message) => {
    if (message.author.bot) {
        return;
    }


    if (message.content === 'banana') {
        // URL of the video to send
        const videoUrl = 'https://media.tenor.com/u8M7kk5ZXmwAAAPo/banana-cat-crying.mp4';

        // Send
        message.channel.send(videoUrl);
    }

    if (message.content === "hello") {
        message.reply("hello world, from banana cat !!");
    }

    if (message.content === "happy") {
        message.reply("happy happy happy !!")
    }

})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "jokes") {
        const joke: any = await NinjaAPI.GetRndomJokes()
        return interaction.reply(`${joke}`);
    }

    if (interaction.commandName === "calculate") {
        const number1: any = interaction.options.get("first-number")?.value
        const sumType: any = interaction.options.get("sum-type")?.value
        const number2: any = interaction.options.get("second-number")?.value

        if (sumType === "+") {
            return interaction.reply(`the resault is : ${Math.abs(number1 + number2)}`);
        }
        if (sumType === "-") {
            return interaction.reply(`the resault is : ${Math.abs(number1 - number2)}`);
        }
        if (sumType === "*") {
            return interaction.reply(`the resault is : ${Math.abs(number1 * number2)}`);
        }
        if (sumType === "/") {
            return interaction.reply(`the resault is : ${Math.abs(number1 / number2)}`);
        }

        return interaction.reply(`wrong sum only type this (+ , - , * , / )`);
    }

    if (interaction.commandName === "ai") {
        const prompt: any = interaction.options.get("prompt")?.value;

        if (!prompt) {
            return interaction.reply("Please provide a valid prompt.");
        }

        const AI = new GeminiAI({ promptParam: prompt });

        try {
            const response = await AI.PrintAI();
            return interaction.reply(response);
        } catch (error) {
            console.error("Error generating AI response:", error);
            return interaction.reply("An error occurred while generating the AI response.");
        }
    }
})

client.login(token);

// Here we just have to create a simple web Rest API, So the app will keep running.
const app = express();
const port = 5000;

app.listen(port, () => {
    return console.log(`server is running on port ${port}`);
})

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "well done!"
    })
})
