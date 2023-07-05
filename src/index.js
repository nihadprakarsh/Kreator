require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const { CommandHandler } = require('djs-commander');
const path = require('path');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

new CommandHandler({
  client,
  eventsPath: path.join(__dirname,'../events'),
});


client.on("messageCreate", (message)=>{
  if (message.content === "/placement") {
    message.channel.send("What do you want to study?").then(()=>{
      message.channel.send(help.map((i) => `${help.indexOf(i)+1}. ${i}`).join("\n"));
    }).then(()=>{
       client.on("messageCreate", (message)=>{
        if(message.content == "1")
        message.channel.send(array.map((i) => `${array.indexOf(i)+1}. ${i}`).join("\n"));
      });
    });
  }
});

help = ["Data Structures", "Algorithms", "Core CS Subjects", "Languages"];
array=["Arrays","Linked List","Greedy Algorithms","Recursion","Backtracking","Binary Search","Heaps","Stacks & Queue","String","Binary Tree","Graph","Dynamic Programming","Trie"];


client.login(process.env.TOKEN);

