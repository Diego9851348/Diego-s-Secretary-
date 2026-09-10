const { Client, GatewayIntentBits } = require('discord.js');  
const Database = require('better-sqlite3');  
require('dotenv').config();

const client = new Client({  
  intents: [  
    GatewayIntentBits.Guilds,  
    GatewayIntentBits.GuildMessages,  
    GatewaySIntentBits.MessageContent || GatewayIntentBits.MessageContent  
  ]  
});

// If the line above causes an error, use this simplified one:  
// intents: [GatewayIntentBits.Guilds, GatewaySIntentBits.GuildMessages, GatewayIntentBits.MessageContent]  
// Wait, let me just provide the most stable version possible:

const finalClient = new Client({  
  intents: [  
    GatewayIntentBits.Guilds,  
    GatewayIntentBits.GuildMessages,  
    GatewayIntentBits.MessageContent  
  ]  
});

const db = new Database('diego_memory.db');  
db.prepare(`CREATE TABLE IF NOT EXISTS memories (userId TEXT, memory TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();

finalClient.on('ready', () => {  
  console.log("Diego is Online! 👔");  
});

finalClient.on('messageCreate', async (message) => {  
  if (message.author.bot) return;  
  const content = message.content.toLowerCase();

  if (content === 'hello diego') {  
    const memories = db.prepare('SELECT memory FROM memories WHERE userId = ? ORDER BY timestamp DESC LIMIT 3').all(message.author.id);  
    let reply = "Hello, Boss! I am online. 👔";  
    if (memories.length > 0) {  
      let memoryList = "";  
      memories.forEach(m => { memoryList += "  
• " + m.memory; });  
      reply += "

Last things I remember:" + memoryList;  
    }  
    return message.reply(reply);  
  }

  if (content.startsWith('remember this:')) {  
    const text = message.content.slice(16).trim();  
    if (!text) return message.reply("Remember what, Boss?");  
    db.prepare('INSERT INTO memories (userId, memory) VALUES (?, ?)').run(message.author.id, text);  
    return message.reply("✅ Filed in my records, Boss.");  
  }

  if (content === 'what do you remember about me?') {  
    const memories = db.prepare('SELECT memory FROM memories WHERE userId = ?').all(message.author.id);  
    if (memories.length === 0) return message.reply("My files are empty, Boss.");  
    let list = "";  
    memories.forEach((m, i) => { list += (i + 1) + ". " + m.memory + "  
"; });  
    return message.reply("📜 **My Records:**  
" + list);  
  }  
});

finalClient.login(process.env.DISCORD_TOKEN);  
