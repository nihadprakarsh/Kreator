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


client.on("messageCreate", (message) => {
  if (message.content === "/placement") {
    message.channel.send("What do you want to study?").then(async () => {
      await message.channel.send(
        help.map((i) => `${help.indexOf(i) + 1}. ${i}`).join("\n")
      );

      
      const filter = (response) => !response.author.bot;
      const collector = message.channel.createMessageCollector({
        filter,
        max: 1, 
        time: 15000, 
      });

      collector.on("collect", (response) => {
        const selectedOption = Number(response.content);
        if (selectedOption === 1) {
          message.channel.send(
            array.map((i) => `${array.indexOf(i) + 1}. ${i}`).join("\n")
          );
          
          const collector2 = message.channel.createMessageCollector({
            filter,
            max: 1, 
            time: 15000, 
          });

          collector2.on("collect", (response2) => {
            // Perform action based on the user's second response
            // Display YouTube video as an embed
            const videoUrl = response2.content;
            const embed = {
              title: "YouTube Video",
              description: videoUrl,
              url: videoUrl,
            };
            message.channel.send({ embed });
          });

          collector2.on("end", (collected) => {
            if (collected.size === 0) {
              message.channel.send("No video URL provided. The process has been canceled.");
            }
          });
        } else {
          // Perform action for other options
        }
      });

      collector.on("end", (collected) => {
        if (collected.size === 0) {
          message.channel.send("You didn't provide a valid option. The placement process has been canceled.");
        }
      });
    });
  }
});



help = ["Data Structures", "Algorithms", "Core CS Subjects", "Languages"];
array=["Arrays","Linked List","Greedy Algorithms","Recursion","Backtracking","Binary Search","Heaps","Stacks & Queue","String","Binary Tree","Graph","Dynamic Programming","Trie"];


client.login(process.env.TOKEN);

