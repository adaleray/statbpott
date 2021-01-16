const Discord = require('discord.js')
exports.run = async (client ,message ,args) => {
const id = args[0]
if (!id) return message.channel.send("Çekmek istediğiniz sesli kanal ıdsi girin")
message.guild.members.cache.filter(a => a.voiceChannel).forEach(ses => ses.setVoiceChannel(id))
message.channel.send(`Sesli kanallarda bulunan herkes <#${id}> isimli odaya çekildi!`)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: "ses-çek"
};