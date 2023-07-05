module.exports = (interaction)=>{
    if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'about') {
    return interaction.reply(`Written in TypeScript & Developed by Nihad`);
  }

  if (interaction.commandName === 'version') {
    return interaction.reply(`I am still in the testing phase and this version is 1.0.0`);
  }

}