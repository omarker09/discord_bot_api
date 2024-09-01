var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import dotenv from "dotenv";
import { Client, IntentsBitField } from 'discord.js';
import { NinjaAPI } from "./services/ninja.api.js";
import { GeminiAI } from "./services/gemini.ai.js";
dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;
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
});
client.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot) {
        return;
    }
    if (message.content === 'banana') {
        // URL of the video to send
        const videoUrl = 'https://media.tenor.com/u8M7kk5ZXmwAAAPo/banana-cat-crying.mp4'; // Replace with the actual video URL
        // Send the video URL
        message.channel.send(videoUrl);
    }
    if (message.content === "hello") {
        message.reply("hello world, from banana cat !!");
    }
    if (message.content === "happy") {
        message.reply("happy happy happy !!");
    }
}));
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (!interaction.isChatInputCommand())
        return;
    if (interaction.commandName === "jokes") {
        const joke = yield NinjaAPI.GetRndomJokes();
        return interaction.reply(`${joke}`);
    }
    if (interaction.commandName === "calculate") {
        const number1 = (_a = interaction.options.get("first-number")) === null || _a === void 0 ? void 0 : _a.value;
        const sumType = (_b = interaction.options.get("sum-type")) === null || _b === void 0 ? void 0 : _b.value;
        const number2 = (_c = interaction.options.get("second-number")) === null || _c === void 0 ? void 0 : _c.value;
        if (sumType === "+") {
            return interaction.reply(`the resault is ${Math.abs(number1 + number2)}`);
        }
        if (sumType === "-") {
            return interaction.reply(`the resault is ${Math.abs(number1 - number2)}`);
        }
        if (sumType === "*") {
            return interaction.reply(`the resault is ${Math.abs(number1 * number2)}`);
        }
        if (sumType === "/") {
            return interaction.reply(`the resault is ${Math.abs(number1 / number2)}`);
        }
        return interaction.reply(`wrong sum only type this (+ , - , * , / )`);
    }
    if (interaction.commandName === "ai") {
        const prompt = (_d = interaction.options.get("prompt")) === null || _d === void 0 ? void 0 : _d.value;
        if (!prompt) {
            return interaction.reply("Please provide a valid prompt.");
        }
        const AI = new GeminiAI({ promptParam: prompt });
        try {
            const response = yield AI.PrintAI();
            return interaction.reply(response);
        }
        catch (error) {
            console.error("Error generating AI response:", error);
            return interaction.reply("An error occurred while generating the AI response.");
        }
    }
}));
client.login(token);
// Here we just have to create a simple web Rest API, So the app will keep running.
const app = express();
const port = 5000;
app.listen(port, () => {
    return console.log(`server is running on port ${port}`);
});
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "well done!"
    });
});
