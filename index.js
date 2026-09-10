require('dotenv').config();  
const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({  
    intents: [  
        GatewayIntentBits.Guilds,  
        GatewayIntentBits.GuildMessages,  
        GatewayIntentBits.MessageContent,  
    ],  
});

client.once(Events.ClientReady, (c) => {  
    console.log(`✅ Diego Personal Secretary is online and ready. Logged in as ${c.user.tag}!`);  
});

client.on(Events.MessageCreate, async (message) => {  
    if (message.author.bot) return;

    // Simple response to "Hello Diego"  
    if (message.content.toLowerCase().includes('hello diego')) {  
        await message.reply('Hello! I am Diego, your personal secretary. How can I help you today? 👔');  
    }  
});

client.login(process.env.DISCORD_TOKEN);  
const { Client, GatewayIntentBits, Partials, EmbedBuilder, PermissionsBitField } = require('discord.js');  
require('dotenv').config();

const client = new Client({  
    intents: [  
        GatewayIntentBits.Guilds,  
        GatewayIntentBits.GuildMessages,  
        GatewayIntentBits.MessageContent,  
        GatewayIntentBits.GuildMembers,  
    ],  
    partials: [Partials.Channel],  
});

client.on('ready', () => {  
    console.log(`✅ Diego Personal Secretary is online and ready!`);  
});

// Basic greeting  
client.on('messageCreate', (message) => {  
    if (message.author.bot) return;  
    if (message.content.to
