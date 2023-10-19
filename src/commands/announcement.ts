import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember, TextChannel } from "discord.js";

import { announcement } from "../components/announce";

export const data = new SlashCommandBuilder()
    .setName("announcement")
    .setDescription("Send an announcement to the announcements channel.")
    .addStringOption((title) =>
        title
            .setName("title")
            .setRequired(true)
            .setDescription("The title of the announcement.")
    )
    .addStringOption((msg) =>
        msg
            .setName("message")
            .setRequired(true)
            .setDescription("The message of the announcement.")
    );

export async function execute(interaction: CommandInteraction) {
    const test = interaction.client.channels.cache.get(
        "1152999555286171829"
    ) as TextChannel;
    const main = interaction.client.channels.cache.get(
        "1158056507506704463"
    ) as TextChannel;

    // const channel =  main == undefined ? test : main;
    test.send({
        embeds: [
            announcement(
                interaction.member as GuildMember,
                interaction.options.getString("title", true),
                interaction.options.getString("message", true)
            ),
        ],
    });
    interaction.reply({ content: "Announcement sent!", ephemeral: true });
}
