import { GuildMember, Message, MessageEmbed } from "discord.js";

export function announcement(
    interaction: GuildMember,
    title: string,
    msg: string
): MessageEmbed {
    // const basicInfoRows = [
    // ["Uptime", uptime.trim()],
    // ["API latency", `${msg.client.ws.ping}ms`],
    // ["Server timezone", Intl.DateTimeFormat().resolvedOptions().timeZone],
    // ];
    return (
        new MessageEmbed()
            .setColor("#000000")
            .setTitle(title)
            .setDescription(msg)
            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL(),
            })
            // .setThumbnail(interaction.client.user?.displayAvatarURL() as string)
            .addFields()
            .setTimestamp()
    );
}
