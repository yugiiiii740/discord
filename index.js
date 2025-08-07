require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Basit bir HTTP server (Render bunu algılayacak)
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

// Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();

const fs = require('fs');

// Komutları yükle
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Eventleri yükle
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
}

client.login(process.env.TOKEN);
