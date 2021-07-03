require('http').createServer((req, res) => res.end(`¡El bot esta online como: Tu Bot`)).listen(3000);
const Discord = require('discord.js');
const client = new Discord.Client({
  ws: { 
    properties: {
      $browser: "Discord Android"
      }
      }
      });

 
let prefix = "!";
let Token = process.env.Token;

client.on("ready", () => {
  console.log(`${client.user.tag} Esta listo`);
  function presence(){
  var status = [`Un estado cual quiera que se puede cambiar y añadir más estados`, `2ºEstado`];
  var randomStatus = Math.floor(Math.random()*(status.length));
  client.user.setPresence({
       status: "online",
       activity: {
           name: status[randomStatus],
           type: "COMPETING"
       }
   });
}
  presence();
  setInterval(function(){
    var status = [`un estado cualquiera que se puede cambiar y añadir más estados`, `2ºEstado`];
  var randomStatus = Math.floor(Math.random()*(status.length));
  client.user.setPresence({
       status: "online",
       activity: {
           name: status[randomStatus],
           type: "COMPETING"
       }
   });
}, 5000);
});

client.on("message", async (message) => {
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
if (!message.content.startsWith(prefix)) return; 
if (message.author.bot) return;
if(command === "commands" || command === "comandos" || command === "help" || command === "ayuda"){
const embed = new Discord.MessageEmbed()
.setTitle("Comandos")
.addField("hf!lockchannel", "‎‎      ‏‏‎‏")
.addField("hf!unlockchannel", "‎      ‏‏‎")
.addField("hf!ban", "‎      ‏‏‎")
.addField("hf!unban", "‎      ‏‏‎")
.addField("hf!kick", "‎      ‏‏‎")
.addField("hf!nuke", "‎      ‏‏‎")
.setTimestamp()
message.author.send(embed)
message.channel.send("Se te enviaron los comandos al MD")
}
if(command === "crearenc") {
let pregunta = args.join(" ")
    if(!pregunta) return message.channel.send('Agrege una pregunta para la encuesta.') 
 
  const embed = new Discord.MessageEmbed() 
       .setAuthor('Pregunta:')
       .setDescription('**'+ pregunta +'**')
       .addField('Opcion 1', '<a:yes:856195423215943680> Si')
       .addField('Opcion 2', '<a:no:856195423567740948> No')
       .setColor(0xff4d4d)
       .setTimestamp()
 
  message.channel.send(embed)
  .then(m => {
         m.react("<a:yes:856195423215943680>");
         m.react("<a:no:856195423567740948>");
 
   });
}

if(command === "lockchannel") {
  var perms = message.member.hasPermission('MANAGE_CHANNELS')

if(!perms)return message.channel.send("Lo siento no tienes permisos para ejecutar este comando nesecitas el permiso `MANAGE_CHANNELS")

if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))
return message.channel.send("No tengo permisos para ejecutar este comando nesecito el permiso `MANAGE_CHANNELS")

const everyone = message.guild.roles.cache.find(
    todos00 => todos00.id === message.guild.id
);
message.channel.updateOverwrite(everyone, {SEND_MESSAGES: false})
message.channel.send("El canal fue bloqueado exitosamente")

}
if(command === "unlockchannel") {
    var perms = message.member.hasPermission('MANAGE_CHANNELS')
        if(!perms)return message.channel.send("Lo siento no tienes permisos para ejecutar este comando nesecitas el permiso `MANAGE_CHANNELS`")
        
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))
        return message.channel.send("No tengo permisos para ejecutar este comando nesecito el permiso `MANAGE_CHANNELS`")
        
        const everyone = message.guild.roles.cache.find(
            todos200 => todos200.id === message.guild.id
        );

        message.channel.updateOverwrite(everyone, {SEND_MESSAGES: true})
message.channel.send("El canal fue desbloqueado exitosamente")

}
if(command === "unban") {
  if(!message.member.hasPermission("BAN_MEMBERS"))
          return message.channel.send('X`|` No tienes permisos para desbanear personas nesecitas el permiso`BAN_MEMBERS`')
  
          if(!message.guild.me.hasPermission("BAN_MEMBERS"))
          return message.channel.send('X`|` No tengo permisos para desbanear personas nesecito el permiso `BAN_MEMBERS`')
  
          let userID = args[0]
          if(!userID)return message.channel.send('X`|` Pon una ID valida')
  
  let razon = args.slice(1).join(" ")
  if (!razon)return message.channel.send('X`|` Porfavor especifica la razon del desbaneo')
  
  
  message.guild.fetchBans().then(bans=> { 
      if(bans.size == 0) return message.channel.send("X`|` No hay ningun ban registrado en este servidor")
  let unbanuser = bans.find(b => b.user.id == userID)
  if(!unbanuser) return message.channel.send("X`|` No existe el usuario mencionado ")
  message.guild.members.unban(unbanuser.user)
  const embedunban = new Discord.MessageEmbed()
          .setTitle(` Modslogs | desbaneo`)
          .addField(`Moderador:`, `${message.author.username}`)
          .addField(`Miembro:`, `<@${userID}>`)
          .addField(`Razon:`, `${razon}`)
          message.channel.send(embedunban);
              }
  )}

if(command === "nuke") {
  if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`> ¡Necesitas el permiso de **Gestionar canales**!`)
      let canal = message.channel;
      let pariente = message.channel.parentID;
      let posicion = message.channel.position;
      let nombre = message.channel.name;
      message.channel.delete()
      message.guild.channels.create(nombre, {
        type: "text",
        parent: pariente
      }).then(channel => {
        channel.setPosition(posicion)
        const embed = new Discord.MessageEmbed()
        .setTitle("**Canal NUEKADO**")
        .setColor("RANDOM")
        .setImage("https://media1.giphy.com/media/3ohuPBA3489AkQk1i0/giphy.gif")
        channel.send(embed)
      });
}
if(command === "ban") {
var server = message.guild;
         let permsBot = message.guild.me.hasPermission("BAN_MEMBERS") 

        if (!permsBot) return message.channel.send("No tengo permisos!")
          
        let perms = message.member.hasPermission("BAN_MEMBERS") 
        if (!perms) return message.channel.send("No tienes permisos!")

        let persona = message.mentions.members.first() 
        if(!persona) return message.channel.send("No mencionaste a nadie!")
		
        if(persona.highestRole > message.member.highestRole){ 
            return message.channel.send("No puedes banear a ese usuario porque su rol es mayor que el tuyo!")
        }
          
        if(persona.highestRole > message.guild.me.highestRole){ 
            return message.channel.send("No puedo banear a ese usuario porque su rol es mayor que el mio!")
        }
        
        var razon = args.slice(2).join(' ') 
        if(!razon) {
          razon = `Sin Razón` 
        }
				
        razon = razon
            
          if(persona.id === '782279302028853248' || persona.id === '353104236491309056') return message.reply('Obviamente no puedes banear al los owners ._.')
        if(!message.guild.member(persona).bannable) return message.reply('Ese usuario no es baneable!')
          
        message.guild.member(persona).ban(razon).catch(e => {
          console.log(e)
          return message.reply("A ocurrido un error desconocido!")
        }) 
        const embed = new Discord.MessageEmbed()
        .setTitle(`${persona.user.tag} Fue Baneado!`)
        .setAuthor(server.name, server.iconURL)
        .addField(`Baneado Por `, `${message.author.tag}!`)
        .addField(`Razón: `, `${razon}`)
        message.channel.send(embed) 
          const embedUser = new Discord.MessageEmbed()
        .setTitle(`${persona.user.tag} Has Sido Kickeado!`)
        .setAuthor(server.name, server.iconURL)
        .addField(`Has Sido Kickeado De:`, `${server.name}`)
        .addField(`Kickeado Por `, `${message.author.tag}!`)
        .addField(`Razón: `, `${razon}`)
        persona.send(embedUser) 
}
if (command === "kick") {
var server = message.guild;
         let permsBot = message.guild.me.hasPermission("KICK_MEMBERS") 
         if (!permsBot) return message.channel.send("No tengo permisos!")
        

        var perms = message.member.hasPermission("KICK_MEMBERS");
        if(!perms) return message.channel.send("No tienes Permisos!");

        let user = message.mentions.members.first();
	      if(user){
        let razon = args.slice(2).join(" ");
        if(!razon) {
          razon = `Sin Razón` 
        }
    
          if(user.highestRole > message.member.highestRole){ 
            return message.channel.send("No puedes expulsar a ese usuario porque su rol es mayor que el tuyo!")
        }
          
        if(user.highestRole > message.guild.me.highestRole){ 
            return message.channel.send("No puedo expulsar a ese usuario porque su rol es mayor que el mio!")
        }
          
          if(user.id === '782279302028853248' || user.id === '353104236491309056') return message.reply('Obviamente no puedes kickear a los owners de el servidor ._.')
        if (!message.guild.member(user).kickable) return message.reply('Ese usuario no puede ser kickeado!');
     
        message.guild.member(user).kick(razon).catch(e => {
          console.log(e)
        }) 
        const embed = new Discord.MessageEmbed()
        .setTitle(`${user.user.tag} Fue Kickeado!`)
        .setAuthor(server.name, server.iconURL)
        .addField(`Kickeado Por `, `${message.author.tag}!`)
        .addField(`Razón: `, `${razon}`)
        message.channel.send(embed) 
          const embedUser = new Discord.MessageEmbed()
        .setTitle(`${user.user.tag} Has Sido Kickeado!`)
        .setAuthor(server.name, server.iconURL)
        .addField(`Has Sido Kickeado De:`, `${server.name}`)
        .addField(`Kickeado Por `, `${message.author.tag}!`)
        .addField(`Razón: `, `${razon}`)
        user.send(embedUser) 
        }else{
          message.channel.send('Debes mencionar a un usuario!')
        }
}
});
client.login(Token);