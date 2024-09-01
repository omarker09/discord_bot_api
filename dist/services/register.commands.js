var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { REST, Routes, ApplicationCommandOptionType } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
class RegisterCommands {
    constructor() {
        this.guild_id = process.env.GUILD_ID;
        this.client_id = process.env.CLIENT_ID;
        this.secret_token = process.env.DISCORD_BOT_TOKEN;
        this.commands = [
            {
                name: "calculate",
                description: "calculate engine",
                options: [
                    {
                        name: "first-number",
                        description: "add number",
                        type: ApplicationCommandOptionType.Number,
                        required: true
                    },
                    {
                        name: "sum-type",
                        description: "+ or - or * or /",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: "second-number",
                        description: "add number",
                        type: ApplicationCommandOptionType.Number,
                        required: true
                    },
                ]
            },
            {
                name: "ai",
                description: "use ai now.",
                options: [
                    {
                        name: "prompt",
                        description: "type your propmt",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                ]
            },
            {
                name: "jokes",
                description: "tell me a joke.",
            }
        ];
        this.Register = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.guild_id || !this.client_id || !this.secret_token) {
                console.error("Missing environment variables: GUILD_ID, CLIENT_ID, or DISCORD_BOT_TOKEN.");
                return;
            }
            const rest = new REST({ version: '10' }).setToken(this.secret_token);
            try {
                console.log('Started refreshing application (/) commands.');
                yield rest.put(Routes.applicationGuildCommands(this.client_id, this.guild_id), { body: this.commands });
                console.log('Successfully reloaded application (/) commands.');
            }
            catch (error) {
                console.error('Error registering commands:', error);
            }
        });
    }
}
(function exec() {
    return __awaiter(this, void 0, void 0, function* () {
        const registerCommands = new RegisterCommands();
        // Call the register method to register commands
        yield registerCommands.Register();
    });
})();
