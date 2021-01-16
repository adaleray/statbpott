const emran = require('discord.js');

exports.run = async(client, message, args) => {
              const kobs = require('../ayarlar.json')
            let prefix = kobs.prefix

              if(message.channel.type == "dm")  return;
if (message.channel.type !== "text") return;
  if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`Yavaş Mod Komutunu Kullanabılmek Icın \`Yönetici\` Yetkisine Sahip Olmalısınız `)  
const limit = args[0] ? args[0] : 0;
  if(!limit) {
              var embed = new emran.MessageEmbed()
                .setDescription(`Doğru kullanım: \`${prefix}yavaş-mod [0/100]\``)
                .setColor('RANDOM')
                .setTimestamp()
            message.channel.send({embed})
            return
          }
if (limit > 100) {
    return message.channel.send(new emran.MessageEmbed().setDescription("<:fraizen_no:752532798320934943> **|** Süre Limiti Maksimum `100` Saniye ayarlanabilir.").setColor('RED'));
}  
    message.channel.send(new emran.MessageEmbed().setDescription(`Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır.`).setColor('GREEN')).then(m => m.delete({ timeout: 5000, reason: 'Siliniyor.' }));
  
var request = require('request');
request({
    url: `https://discord.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.token}`
    },
})};
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slow-mode", "slowmode", "yavas-mod", 'yavasmod', 'yavaşmod'],
  permLevel: 0,

};

exports.help = {
  name: 'yavaş',
  description: 'Sohbete yazma sınır (süre) ekler.',
  usage: 'yavaş [1/10]',
};