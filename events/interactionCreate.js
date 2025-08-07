const { ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (command) await command.execute(interaction);
    }

    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'ticket_category') {
        const category = interaction.values[0];

        const channel = await interaction.guild.channels.create({
          name: `ticket-${interaction.user.username}`,
          type: ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [PermissionFlagsBits.ViewChannel],
            },
            {
              id: interaction.user.id,
              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
            },
            {
              id: 'YETKILI_ROLE_ID', // 1402965706215260302
              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
            }
          ]
        });

        await channel.send({
          content: `🎫 Merhaba ${interaction.user}, destek talebin "${category}" kategorisi ile oluşturuldu.`,
        });

        await interaction.reply({ content: `✅ Ticket oluşturuldu: ${channel}`, ephemeral: true });
      }
    }
  }
};
