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
    if (message.content.toLowerCase() === 'hello diego') {  
        message.reply('Hello! I am Diego, your personal secretary. How can I help you today? 👔');  
    }  
});

// Moderation Commands  
client.on('interactionCreate', async (interaction) => {  
    if (!interaction.isChatInputCommand()) return;

    const { commandName, options } = interaction;

    // KICK COMMAND  
    if (commandName === 'kick') {  
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {  
            return interaction.reply({ content: '❌ You do not have permission to kick members!', ephemeral: true });  
        }  
        const user = options.getUser('user');  
        const reason = options.getString('reason') || 'No reason provided';

        try {  
            await user.kick();  
            interaction.reply(`✅ **${user.tag}** has been kicked by Diego.   
Reason: ${reason}`);  
        } catch (error) {  
            interaction.reply({ content: '❌ I cannot kick this user. They might have a higher role than me!', ephemeral: true });  
        }  
    }

    // BAN COMMAND  
    if (commandName === 'ban') {  
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {  
            return interaction.reply({ content: '❌ You do not have permission to ban members!', ephemeral: true });  
        }  
        const user = options.getUser('user');  
        const reason = options.getString('reason') || 'No reason provided';

        try {  
            await user.ban({ reason: reason });  
            interaction.reply(`🚫 **${user.tag}** has been banned by Diego.   
Reason: ${reason}`);  
        } catch (error) {  
            interaction.reply({ content: '❌ I cannot ban this user. They might have a higher role than me!', ephemeral: true });  
        }  
    }  
});

client.login(process.env.DISCORD_TOKEN);  
