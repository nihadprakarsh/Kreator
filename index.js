require("dotenv").config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  MessageEmbed,
  ActivityType,
} = require("discord.js");
const { CommandHandler } = require("djs-commander");
const path = require("path");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});


client.on('ready',(c)=>{
  client.user.setActivity({
    name:'Google I/O 2023',
    type:ActivityType.Streaming,
    url:'https://www.youtube.com/watch?v=cNfINi5CNbY&pp=ygUJZ29vZ2xlIGlv',
  });
});

new CommandHandler({
  client,
  eventsPath: path.join(__dirname, 'events'),
});

{
  help = ["Data Structures", "Algorithms", "Core CS Subjects", "Languages"];
  array = [
    "Arrays",
    "Linked List",
    "Greedy Algorithms",
    "Recursion",
    "Backtracking",
    "Binary Search",
    "Heaps",
    "Stacks & Queue",
    "String",
    "Binary Tree",
    "Graph",
    "Dynamic Programming",
    "Trie",
  ];
  links = [
    {
      title: "Arrays (Basic to Advanced)",
      source: "Take you forward",
      url: "https://www.youtube.com/watch?v=37E9ckMDdTk&list=PLgUwDviBIf0rENwdL0nEH0uGom9no0nyB",
    },
  ];
}



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
            const index = Number(response2.content) - 1;
            console.log(index);
            if (index >= 0 && index < links.length) {
              const embed = new EmbedBuilder().setTitle((links[index].title))
              .setDescription(links[index].source)
              .setURL(links[index].url)
              .setColor('Random');
    
              const embed1 = new EmbedBuilder().setTitle("Array interview problems")
              .setDescription("Leetcode Curated")
              .setURL("https://www.youtube.com/watch?v=f-Kfg6ujpG8&list=PLjeQ9Mb66hM33kyoJjJbHf72Rb0G70Sae")
              .setColor('Random');
              message.channel.send({ embeds:[embed,embed1] });
            } else {
              message.channel.send("Invalid option selected.");
            }
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
          message.channel.send(
            "You didn't provide a valid option. The placement process has been canceled."
          );
        }
      });
    });
  }
});

client.login(process.env.TOKEN);
