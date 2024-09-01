import { REST, Routes, ApplicationCommandOptionType } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

interface CommandType {
    name: string;
    description: string;
    options?: any[]
}

class RegisterCommands {
    private guild_id: string | undefined = process.env.GUILD_ID;
    private client_id: string | undefined = process.env.CLIENT_ID;
    private secret_token: string | undefined = process.env.DISCORD_BOT_TOKEN;
    
    commands: CommandType[] = [
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
        },
        {
            name: "jokes",
            description: "tell me a joke.",
        }
    ];

    Register = async () => {
        if (!this.guild_id || !this.client_id || !this.secret_token) {
            console.error("Missing environment variables: GUILD_ID, CLIENT_ID, or DISCORD_BOT_TOKEN.");
            return;
        }

        const rest = new REST({ version: '10' }).setToken(this.secret_token);

        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationGuildCommands(this.client_id, this.guild_id),
                { body: this.commands }
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error('Error registering commands:', error);
        }
    }
}

(async function exec() {
    const registerCommands = new RegisterCommands();

    // Call the register method to register commands
    await registerCommands.Register();
})();
