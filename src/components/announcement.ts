import { GuildMember, MessageEmbed } from "discord.js";

export function announcement(
    interaction: GuildMember,
    title: string,
    msg: string
): MessageEmbed {
    msg = msg.replace(/\\n/g, "\n");
    const fields = { name: title, value: msg };
    return new MessageEmbed()
        .setColor("#000000")
        .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL(),
        })
        .addFields(fields)
        .setTimestamp();
}
