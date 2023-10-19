import { Client, Message, MessageEmbed } from "discord.js";

export function info(
    message: Message,
    client: Client,
    id: string
): MessageEmbed {
    const user = client.users.cache.find((user) => user.id == id);
    const userInfo = [
        ["Name", `**${user?.username}#${user?.discriminator}**`],
        ["ID", `\`${user?.id}\``],
        ["Created", `${user?.createdAt.toDateString()}`],
        ["Mention", `<@${user?.id}>`],
    ];

    const uinfo = {
        name: "User Information",
        value: `${userInfo
            .map(([label, value]) => `${label}: ${value}`)
            .join("\n")}`,
    };
    return (
        new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("\n")
            .setAuthor({
                name: ((("User: " + user?.username) as string) +
                    "#" +
                    user?.discriminator) as string,
                iconURL: user?.avatarURL() as string,
            })
            .addFields(uinfo)
            .setTimestamp()
    );
}
