const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Destek talebi başlat'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🎟️ NOVA JB - DESTEK SISTEMI')
      .setDescription('👋 Merhaba! Aşağıdan ihtiyacın olan destek kategorisini seçerek bize ulaşabilirsin.\n\n__**📌 Ticket Kuralları:**__\n🔒 • Yanlış kategoriye açılan talepler kapatılır\n🚫 • Yetkililere etiket atma')
      .setColor('Blurple');

    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('ticket_category')
          .setPlaceholder('Lütfen destek talebi nedeninizi seçiniz.')
          .addOptions(
            {
              label: 'Satın Alım',
              description: 'Küçük skin veya yetki alımı için.',
              value: 'satinalim',
              emoji: '💎'
            },
            {
              label: 'Bug & Şikayet Bildir',
              description: 'Bug veya şikayet bildirmek için.',
              value: 'bug',
              emoji: '🛠️'
            },
            {
              label: 'Diğer',
              description: 'Diğer sebeplerden dolayı ticket açıyorsanız.',
              value: 'diger',
              emoji: '📩'
            }
          )
      );

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  }
};
