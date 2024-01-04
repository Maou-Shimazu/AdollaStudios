import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Get the amount of members in the server");

export async function execute(interaction: CommandInteraction) {
    const fields = {
        name: "Members",
        value: interaction.guild?.memberCount.toString() || "Undefined",
    };
    interaction.reply({
        embeds: [
            new MessageEmbed()
                .setColor("#000000")
                .addFields(fields)
                .setTimestamp(),
        ],
    });
}
