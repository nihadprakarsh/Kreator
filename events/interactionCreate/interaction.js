const { EmbedBuilder } = require("discord.js");

module.exports = (interaction)=>{
    if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'about') {
    return interaction.reply(`Written in TypeScript & developed by Nihad`);
  }

  if (interaction.commandName === 'version') {
    return interaction.reply(`I am still in the testing phase and this version is 1.0.0`);
  }

  if (interaction.commandName === 'resumehelp') {
    return interaction.reply(`https://www.geeksforgeeks.org/resume-building-resources-and-tips/`);
  }

  if (interaction.commandName === 'resumetemplate') {
    return interaction.reply(`https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs`);
  }

  if (interaction.commandName === 'sdesheet') {
    interaction.reply({ content: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/', ephemeral: true })
  }
  

}