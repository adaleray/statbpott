const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    `Az Önce Bot Ping yedi, Sorun önemli değil merak etme. Hatayı düzelttik.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const db = require('quick.db')
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//--------------------------------KOMUTLAR-------------------------------\\

/////////
client.on("message", async msg => {
  
  
  let a = await db.fetch(`kufur_${msg.guild.id}`)
    if (a == 'acik') {
      const küfür = [
        "yarak","mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git","31","ananın amına yarak"
                  ]
            if (küfür.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("MANAGE_GUILD")) {
                  msg.delete();
                          
                    return msg.channel.send(`Kufur Etme !`).then(msg => msg.delete(10000));
            }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!a) return;
          })

///reklamengel

client.on("message", async message => {
  
  const lus = await db.fetch(`reklamengel_${message.guild.id}`)
  if (lus) {
    const reklamengel = ["discord.app", "discord.gg", ".party", ".com", ".az", ".net", ".io", ".gg", ".me", ".org", ".tr", ".gl", "glicht.me/", ".rf.gd", ".biz", "www.", "www"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          
          return message.reply('Hey Dur! Bu Sunucuda Reklamı Engelliyorum').then(message => message.delete(3000));
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});
client.on("messageUpdate", async message => {
  
  const lus = await db.fetch(`reklamengel_${message.guild.id}`)
  if (lus) {
    const reklamengel = ["discord.app", "discord.gg", ".party", ".com", ".az", ".net", ".io", ".gg", ".me", ".org", ".tr", ".gl", "glicht.me/", ".rf.gd", ".biz", "www.", "www"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          
          return message.reply('Hey Dur! Bu Sunucuda Reklamı Engelliyorum').then(message => message.delete(3000));
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});



/////Rol Koruma
client.on("roleDelete", async role => {
         const entry = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.guild.roles.create({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}, reason: 'Silinen Rol Açıldı.'})
})
client.on("roleCreate", async role => {
       const entry = await role.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.delete()
}) 
//KanalKoruma

client.on("channelDelete", async function(channel) {
    let rol = await db.fetch(`kanalk_${channel.guild.id}`);
  
  if (rol) {
const guild = channel.guild.cache;
let channelp = channel.parentID;

  channel.clone().then(z => {
    let kanal = z.guild.channels.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.find(channel => channel.id === channelp)
      
    );
  });
  }
})



//kick
client.on("message", async message => {
  
  const lus = await db.fetch(`reklamkick_${message.guild.id}`)
    let sayı = await db.fetch(`sayı_${message.author.id}`);
let a = message.author
  if (lus) {
    const reklamengel = ["discord.app", "discord.gg", ".party", ".com", ".az", ".net", ".io", ".gg", ".me", ".org", ".tr", ".gl", "glicht.me/", ".rf.gd", ".biz", "www.", "www"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          db.add(`sayı_${message.author.id}`, 1)
          if (sayı == null) {
            const sa = new Discord.MessageEmbed()
            .setDescription(`Hey! <@${message.author.id}> Bu İlk Uyarın Lütfen Tekrarlama!`)
            message.channel.send(sa)
            message.delete()
            a.send(`Bu İlk Uyarın Lütfen Tekrarlama`)
            return 
          }
         if (sayı === 1) {
               const sa = new Discord.MessageEmbed()
            .setDescription(`Hey! <@${message.author.id}> Bu İkinci Uyarın Lütfen Tekrarlama!`)
            message.channel.send(sa)
            message.delete()
            a.send(`Bu İkinci Uyarın Lütfen Tekrarlama`)
            return 
         }
            if (sayı > 2) {
               const sa = new Discord.MessageEmbed()
            .setDescription(`Hey! <@${message.author.id}> Reklamdan Dolayı Kickledim!`)
            message.channel.send(sa)
            message.delete()
            a.send(`${message.guild.name} Sunucusundan Reklam Yaptığın İçin Kicklendin!`)
                db.delete(`sayı_${message.author.id}`)
message.guild.member(a).kick();     
              return
            }
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});




//_____________________________

client.on("ready", async function() {
const voiceChannel = "770191774630281226"
client.channels.cache.get(voiceChannel).join()
.catch(err => {
throw err;
})
})


/////////////////Sa-As
client.on("message", async (msg, member, guild) => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply(
      "**Aleyküm Selam Hoşgeldin <a:747520543703695480:774949259610161162>  ** "
    );
  }
});

////////////////
client.on("message", async (msg, member, guild) => {
  if (msg.content.toLowerCase() === "sea") {
    msg.reply(
      "**Aleyküm Selam Hoşgeldin <a:747520543703695480:774949259610161162> ** "
    );
  }
});
////////////////
client.on("message", async (msg, member, guild) => {
  if (msg.content.toLowerCase() === "Sea") {
    msg.reply(
      "**Aleyküm Selam Hoşgeldin <a:747520543703695480:774949259610161162> ** "
    );
  }
});
//////////////
client.on("message", async (msg, member, guild) => {
  if (msg.content.toLowerCase() === "selam") {
    msg.reply(
      "**Aleyküm Selam Hoşgeldin <a:747520543703695480:774949259610161162> ** "
    );
  }
});
////////////////
client.on("message", async (msg, member, guild) => {
  if (msg.content.toLowerCase() === "Selam") {
    msg.reply(
      "**Aleyküm Selam Hoşgeldin <a:747520543703695480:774949259610161162> ** "
    );
  }
});
///////////////
client.on("message", async (msg, member, guild) => {
  if (msg.content.toLowerCase() === "Selamun Aleyküm") {
    msg.reply(
      "**Aleyküm Selam Hoşgeldin  <a:747520543703695480:774949259610161162> ** "
    );
  }
});

////////////
client.on("message", async (msg, member, guild) => {
  if (msg.content.toLowerCase() === "selamlar") {
    msg.reply(
      "**Aleyküm Selam Hoşgeldin <a:747520543703695480:774949259610161162>  ** "
    );
  }
});
//////////////
client.on("message", async (msg, member, guild) => {
  if (msg.content.toLowerCase() === "selamunaleyküm") {
    msg.reply(
      "**Aleyküm Selam Hoşgeldin <a:747520543703695480:774949259610161162> ** "
    );
  }
});
/////////////////
client.on("message", async (msg, member, guild) => {
  if (msg.content.toLowerCase() === "SelamunAleyküm") {
    msg.reply(
      "**Aleyküm Selam Hoşgeldin  <a:747520543703695480:774949259610161162>** "
    );
  }
});

//////////////
client.on("message", async (msg, member, guild) => {
  if (msg.content.toLowerCase() === "Selamun Aleyküm") {
    msg.reply(
      "**Aleyküm Selam Hoşgeldin <a:747520543703695480:774949259610161162> ** "
    );
  }
});


//////////////////////////////BotAtack/////////////////////////////////////////////////

client.on('guildMemberAdd', async (member) => {
  let a = await db.fetch(`r_${member.guild.id}`)
  if (a) {
    const guild = member.guild;


 let channels = member.guild.channels.cache.find(c => c.name === '773634943565692938')

    if(member.user.bot !==true){

    } 
    else {

    channels.send(`Sunucumza Bot Geldıgı Icın Banlandı`)
    .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
       member.ban(member) 
    }
  }  
  });


// DM HOŞGELDİN

client.on(`guildMemberAdd`, async lrowsmember => {
let lrowstag = 'Ꙙ';
  const e = new Discord.MessageEmbed()
    .setColor(`Random`)
    .setImage(`https://cdn.discordapp.com/avatars/773628301243187200/b45d082a51529f161bdd2aca52e0d380.png?size=1024`)
    .addField(
      `<a:737769284339761153:773653003571429417>ALERİA SUNUCUMUZA HOŞGELDİNİZ<a:747563428360749116:773632485082923090>`,
      `<a:7403_whitecrown:770049170677039187> **Tagımızı alarak bize destek olabilirsin.İyi eğlenceler keyifli vakitler dileriz.** `
    )
.addField("İşte tagımız:", lrowstag)
  lrowsmember.send(e);
}); 


client.on("guildMemberUpdate", async (client, gcOLD, gcNEW) => {
if(!gcOLD.premiumSince && gcNEW.premiumSince) {
client.channels.cache.get('769884664760369153').send('wow **'+gcNEW.user.username+'**  adlı kullanıcı sunucumuza takviye **yaptı** teşekürler **'+gcNEW.user.username+'** :heart:')
}
})



client.on("guildMemberAdd", async member => {
    client.channels.cache.get('769159402137059381').setTopic(`${member .guild.members.cache.size} kişiyiz!<a:747563428360749116:773632485082923090> Son katılan kişi<a:753530419462406145:773276160339607594>: ${member.user} , <a:737769284339761153:773653003571429417>`)
});

client.on("guildMemberRemove", async member => {
    client.channels.cache.get('769159402137059381').setTopic(`${member .guild.members.cache.size} kişiyiz!<a:747563428360749116:773632485082923090> Son katılan kişi<a:753530419462406145:773276160339607594>: ${member.user},<a:737769284339761153:773653003571429417> `)
});


client.on('message', async msg => {          ////Eray
if (msg.author.id === '') {
await msg.react('<a:7403_whitecrown:770049170677039187>')
}
})

client.on('message', async msg => {
if (msg.author.id === '') {                ////muhammett
await msg.react('<a:5168_FuckMeBabe:770050284298436619>')
}
})

//////bot korumaaaa
client.on('guildMemberAdd', async member => {
if(!member.user.bot) return
  member.guild.channels.cache.get('773634943565692938').send(`Sunucuya ${member.user.tag} adlı bot eklendi!`)
})


/////bot guard
///bottt

client.on("guildMemberAdd", async member => {
if (member.user.bot) {

member.guild.members.ban(member)
client.channels.cache.get("773634943565692938").send(`${member} bot olduğu için banladım! Kafanız Rahat olsun Gençler <@393067117169213440> <@302420202631593994> <@621319884143460359> <a:750341192008597684:772455369221734420>`)
}
});
///

client.on('message', async msg => {               ////barış
if (msg.author.id === '') {
await msg.react('<a:759801648695476234:773277564226895962>')
}
})

client.on('message', async msg => {
if (msg.author.id === '') {                            ////merve
await msg.react('<a:753980506307166270:774751272565211147>')
}
})


///////////////////////////////////////////////////////////////test///////////////

//Tag sistemi
client.on("message", msg => {
  if (msg.content === "eray") {
    msg.channel.send("<a:774632592963141642:774949383372144650> O müsait değil ben yardımcı olabilirim.<a:85a23ee558db4e6ebc935efa6ddc26c1:770655459035709440>");//Tagınızı yazın
     }
});
