const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Discord.MessageEmbed()
.setColor('GREEN')
.setAuthor(`ALERİA GUARD BOT`)
.setDescription(`


:white_small_square: **=**  \`+kanal-koruma\` : **Kanal Koruma Aç/Kapat**
:white_small_square: **=**  \`+küfür-engel\`:  **Küfür Engel Aç/Kapat**
:white_small_square: **=**  \`+reklam-engel\` :  **Reklam Engel Aç/Kapat**
:white_small_square: **=**  \`+sohbet aç-kapat\` :  **Sohbeti Açıp Kapatırsınız**
:white_small_square: **=**  \`+ban\`: **Belirttiğiniz Kişiyi Sunucudan Banlarsınız**
:white_small_square: **=**  \`+unban\`:  **Belirttiğiniz Kişinin Banını Kaldırırsınız**
:white_small_square: **=**  \`+istatistik\`:  **Botun İstatistiklerini Atar**
:white_small_square: **=**  \`+temizle\`:  **Belirttiğiniz Sayıda Mesajı Siler**
:white_small_square: **=**  \`+ping\`:  **Pinginizi Ölçüp Atar**
:white_small_square: **=**  \`+avatar\`:  **Avatarınızı Atar**
:white_small_square: **=**  \`+reklam-kick\`:  **reklam kick sistemi**
:white_small_square: **=**  \`+uyar\`:  **dm den uyarı atar**
:white_small_square: **=**  \`+uyarı-ölç\`:  **uyarı sayısı**
:white_small_square: **=**  \`+yetkililer\`:  **yetkili sayısı**


`)
.setImage("https://cdn.discordapp.com/avatars/773628301243187200/b45d082a51529f161bdd2aca52e0d380.png?size=1024")
.setThumbnail(message.author.avatarURL())
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['help'], 
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: 'Bizim yaptığımız bir yardım kodu.',
  usage: 'yardım'
};