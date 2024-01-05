import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Get the amount of members in the server");

export async function execute(interaction: CommandInteraction) {
    const members_in_guild: number =
        (await interaction.guild?.members.fetch())?.filter(
            (member) => !member.user.bot
        ).size ?? 0;
    let bots = interaction.guild?.memberCount ?? 0;
    bots -= members_in_guild;

    const fields = [
        {
            name: "Members",
            value: members_in_guild?.toString() || "Undefined",
            inline: true,
        },
        { name: "Bots", value: bots.toString(), inline: true },
    ];
    interaction.reply({
        embeds: [
            new MessageEmbed()
                .setColor("#000000")
                .addFields(fields)
                .setTimestamp()
                .setFooter({text: interaction.user.username})
        ],
    });
}
