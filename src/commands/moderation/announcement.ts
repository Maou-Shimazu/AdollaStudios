import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember, TextChannel } from "discord.js";
import { announcement } from "../../components/announcement";
import { PermissionFlagsBits } from "discord-api-types/v10";

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
    )
    .addMentionableOption((role) =>
        role
            .setName("role")
            .setRequired(false)
            .setDescription("The role to ping.")
    )
    .addChannelOption((channel) =>
        channel
            .setName("channel")
            .setRequired(false)
            .setDescription("The channel to send the announcement to.")
    ).setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: CommandInteraction) {
    let send_channel = interaction.options.getChannel(
        "channel",
        false
    ) as TextChannel;
    if (!interaction.options.getChannel("channel", false)) {
        send_channel = interaction.client.channels.cache.get(
            "1188697099018186792"
        ) as TextChannel;
    }
    const mention = interaction.options.getMentionable("role", false);
    if (mention) {
        send_channel.send(`${mention}`);
    }
    send_channel.send({
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
