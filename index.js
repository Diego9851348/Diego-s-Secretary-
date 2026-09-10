const { Client, GatewayIntentBits } = require('discord.js');  
const Database = require('better-sqlite3');  
require('dotenv').config();

const client = new Client({   
    intents: [   
        GatewayIntentBits.Guilds,   
        GatewayIntentBits.GuildMessages,   
        GatewayIntentBits.MessageContent   
    ]   
});

// --- DATABASE SETUP ---  
// This creates the file diego_memory.db to store your secrets  
const db = new Database('diego_memory.db');  
db.prepare(`CREATE TABLE IF NOT EXISTS memories (   
    userId TEXT,   
    memory TEXT,   
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP   
)`).run();

client.on('ready', () => {  
    console.log(`${client.user.tag} is online and guarding the server! 👔`);  
});

client.on('messageCreate', async (message) => {  
    if (message.author.bot) return;  
    const content = message.content.toLowerCase();

    // 1. CONVERSATION GREETING  
    if (content === 'hello diego') {  
        const memories = db.prepare('SELECT memory FROM memories WHERE userId = ? ORDER BY timestamp DESC LIMIT 3').all(message.author.id);  
        let reply = "Hello, Boss! I am online and ready for your orders. 👔";  
        if (memories.length > 0) {  
            reply += `

Last things I remember for you:  
${memories.map(m => `• ${m.memory}`).join('  
')}`;  
        }  
        return message.reply(reply);  
    }

    // 2. SAVING MEMORIES  
    if (content.startsWith('remember this:')) {  
        const memoryText = message.content.slice(16).trim();  
        if (!memoryText) return message.reply("Remember what, Boss? Please tell me what to save!");  
        db.prepare('INSERT INTO memories (userId, memory) VALUES (?, ?)').run(message.author.id, memoryText);  
        return message.reply(`✅ Noted, Boss. I have filed "${memoryText}" in my records.`);  
    }

    // 3. RECALLING MEMORIES  
    if (content === 'what do you remember about me?') {  
        const memories = db.prepare('SELECT memory FROM memories WHERE userId = ?').all(message.author.id);  
        if (memories.length === 0) return message.reply("My files on you are currently empty, Boss. Tell me something to remember!");  
        const list = memories.map((m, i) => `${i + 1}. ${m.memory}`).join('  
');  
        return message.reply(`📜 **My Records for ${message.author.username}:**  
${list}`);  
    }  
});

client.login(process.env.DISCORD_TOKEN);  
