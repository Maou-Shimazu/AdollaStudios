import { Client } from "discord.js";
import { config } from "./config";
import { log } from "./logger";
import * as uptime from "./misc/uptime";
import * as commandModules from "./commands";
const commands = Object(commandModules);

export const client = new Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
});

client.once("ready", () => {
    log.info("Bot is ready!");
    client.user?.setPresence({
        activities: [
            {
                name: "/about",
                type: "LISTENING",
                url: "https://discord.com/api/oauth2/authorize?client_id=1152994316084580465&permissions=8&scope=bot",
            },
        ],
        status: "online",
    });
    uptime.startUptimeCounter();
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    commands[commandName].execute(interaction, client);
});

process.on("SIGINT", () => {
    log.info("Caught interrupt signal");
    log.info("Bot is offline!");
    client.destroy();
});

client.login(config.BOT_TOKEN);
