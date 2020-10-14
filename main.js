const Discord = require('discord.js');
const colors = require('./colors.json');
const config = require('./config.json');
const client = new Discord.Client();
var prefix = '>';
const ytdl = require('ytdl-core');
var search = require('youtube-search');
const fs = require('fs');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
var PlaylistSummary = require('youtube-playlist-summary');
var opts = {
    maxResults: 1,
    key: config["youtube-api"],
    type: 'video'
  };


var psOpts = {
    GOOGLE_API_KEY: config["youtube-api"], // require
    PLAYLIST_ITEM_KEY: ['publishedAt', 'title', 'description', 'videoId', 'videoUrl'], // option
  }

 
const ps = new PlaylistSummary(psOpts);



var info = true;
var help = true;
var support = true;
var contact = true;
var join = true;
var play_toggle = true;
var volume_toggle = true;
var playlist_toggle = true;
var leave = true;
var featured = true;
var prefix_toggle = true;
var poll_toggle = true;
var request_toggle = true;
var loop_toggle = true;
var radio_toggle = true;
var queue_toggle = true;
var shuffle_toggle = true;
var clear_toggle = true;

var info_perm = 'SEND_MESSAGES';
var help_perm = 'SEND_MESSAGES';
var support_perm = 'SEND_MESSAGES';
var contact_perm = 'SEND_MESSAGES';
var join_perm = 'SEND_MESSAGES';
var play_perm = 'SEND_MESSAGES';
var volume_perm = 'MANAGE_MESSAGES';
var playlist_perm = 'SEND_MESSAGES';
var leave_perm = 'SEND_MESSAGES';
var featured_perm = 'SEND_MESSAGES';
var prefix_perm = 'ADMINISTRATOR';
var poll_perm = 'MANAGE_MESSAGES';
var request_perm = 'SEND_MESSAGES';
var loop_perm = 'SEND_MESSAGES';
var radio_perm = 'SEND_MESSAGES';
var queue_perm = 'SEND_MESSAGES';
var shuffle_perm = 'SEND_MESSAGES';
var clear_perm = 'SEND_MESSAGES';
var skip_perm = 'SEND_MESSAGES';




var volume = 1;

var songLimit = 10;


var queue = [];
var servers = {};

var loop_enable = false;

const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Very High'
};

const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};



client.once('ready', () => {
    console.log('BanZ is Online!');
    client.user.setActivity(">help"); 
});

client.on('message', async message => {
    var server = message.guild.id;

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    }

    if(!servers[message.guild.id]) servers[message.guild.id] = {
        volume: 1
    }


    var split = message.content.split(' ');
    if(split[0] == 'banzprefix')
    {
        if(message.member.permissions.has(prefix_perm))
        {
            if(split[1])
            {
                prefix = split[1];
                cache(config.prefix,prefix);
            }
            embed = new Discord.MessageEmbed()
            .setColor(colors.indigo)
            .setTitle('The Prefix is '+'`'+prefix+'`')
            .setFooter(`Requested by - ${message.author.username}`);
            message.channel.send({embed: embed});
        } else {
            message.reply('It seems that you do not have the required permission ' + '`' + prefix_perm + '`');
        }
    }



    if(command === 'info') //complete
    {
        if(info)
        {
            if(message.member.permissions.has(info_perm)) {
                embed = new Discord.MessageEmbed()
                .setColor(colors.indigo)
                .setTitle(`**Server Info for ${message.guild.name}**`)
                .addField('Server:',message.guild.name)
                .addField('ID:',message.guild.id)
                .addField('Owner:',message.guild.owner.user.tag)
                .addField('Region:',message.guild.region)
                .addField('Boost Tier:',`${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`)
                .addField('Explicit Filter:',filterLevels[message.guild.explicitContentFilter])
                .addField('Verification Level:',verificationLevels[message.guild.verificationLevel])
                .addField('Members:',message.guild.memberCount)
                .setFooter(`Requested by - ${message.author.username}`);
                message.channel.send({embed: embed});
            }
            else {message.reply('It seems that you do not have the required permission ' + '`' + info_perm + '`');}
        }
        else
        {message.reply('This command has been disabled by an `ADMINISTRATOR`');}
    }

    if(command === 'help') //complete
    {
        if(help)
        {
            if(message.member.permissions.has(help_perm))
            {
                embed = new Discord.MessageEmbed()
                .setColor(colors.indigo)
                .setTitle(`**Help for ${message.guild.name}**`)
                .addField('--------------------------------------------------------------------------------------------------','**SERVER**')
                .addField('>info','Gives server info',true)
                .addField('>contact',"Creator's contact info",true)
                .addField('>socials','Our Social Medias',true)
                .addField('>featured','Shows our featured servers',true)
                .addField('>poll','Create a poll',true)
                .addField('>prefix','Changes the Bot\'s Prefix',true)
                .addField('--------------------------------------------------------------------------------------------------','**MUSIC**')
                .addField('>play','Plays a song',true)
                .addField('>join','Joins your channel',true)
                .addField('>leave','Leaves your channel',true)
                .addField('>volume','Changes the bot\'s volume',true)
                .addField('>loop','Loops the current song',true)
                .addField('>radio','Plays pre-made radios',true)
                .addField('>clear','Clears the current queue',true)
                .addField('>queue','Gives info on the queue',true)
                .addField('>shuffle','Shuffles the current queue',true)
                .setFooter(`Requested by - ${message.author.username}`);
                message.channel.send({embed: embed});
            }
            else
            {
                message.reply('It seems that you do not have the required permission ' + '`' + help_perm + '`');
            }


        }
        else
        {
            message.reply('This command has been disabled by an `ADMINISTRATOR`');
        }
    }

    if(command === 'socials') //complete
    {
        if(message.member.permissions.has(support_perm))
        {
            embed = new Discord.MessageEmbed()
            .setColor(colors.indigo)
            .setTitle('**BanZ\'s Socials**')
            .addField('Discord:','https://discord.gg/KTGmTNK')
            .addField('Website:','https://banz-development.webflow.io/')
            .addField('Patreon:','https://www.patreon.com/banzbot')
            .addField('Twitter:','https://twitter.com/banzdevelopment')
            .setFooter(`Requested by - ${message.author.username}`);
            message.channel.send({embed: embed});
        }
        else
        {
            message.reply('It seems that you do not have the required permission ' + '`' + support_perm + '`');
        }
    }

    if(command === 'contact') //complete
    {
        if(contact)
        {
            if(message.member.permissions.has(contact_perm))
            {
                embed = new Discord.MessageEmbed()
                .setColor(colors.indigo)
                .setTitle('**Contact Bot Owners for Questions**')
                .addField('Cherry:','cherry#2222')
                .addField('Lucky:','RaidLucky#0001')
                .setFooter(`Requested by - ${message.author.username}`);
                message.channel.send({embed: embed});
            }
            else
            {
                message.reply('It seems that you do not have the required permission ' + '`' + contact_perm + '`');
            }
        }
        else
        {
            message.reply('This command has been disabled by an `ADMINISTRATOR`');
        }
    }

    if(command === 'join') //complete
    {
        if(join)
        {
            if(message.member.permissions.has(join_perm))
            {
                const channel = message.member.voice.channel;
                if (!channel) return console.error("The channel does not exist!");
                channel.join().then(connection => {
                    console.log("Successfully connected.");
                    connection.voice.setSelfDeaf(true);
                    play('https://www.youtube.com/watch?v=kCQAzVvz8Sg&feature=youtu.be');
                    embed = new Discord.MessageEmbed()
                    .setColor(colors.indigo)
                    .setTitle(`Joined **${channel.name}**!`)
                    .setFooter(`Requested by - ${message.author.username}`);
                    message.channel.send({embed: embed});
                }).catch(e => {
            
                    // Oh no, it errored! Let's log it to console :)
                    console.error(e);
                });
            }
            else
            {
                message.reply('It seems that you do not have the required permission ' + '`' + join_perm + '`');
            }
        }
        else
        {
            message.reply('This command has been disabled by an `ADMINISTRATOR`');
        }
    } 

    if(command === 'play') //needs spotify and soundcloud
    {
        if(play_toggle)
        {
            if(message.member.permissions.has(play_perm))
            {   
                if(!args[0])
                {
                    embed = new Discord.MessageEmbed()
                    .setColor(colors.indigo)
                    .setTitle(`**Incorrect Syntax**!`)
                    .addField('Syntax:','>play [link or title]')
                    .setFooter(`Requested by - ${message.author.username}`);
                    message.channel.send({embed: embed});
                }
                else
                {
                    if(message.content.startsWith('>play https://www.youtube.com/'))
                    {
                        if(message.content.startsWith('>play https://www.youtube.com/watch'))
                        {
                            play(args[0]);
                        }
                        else if(message.content.startsWith('>play https://www.youtube.com/playlist'))
                        {
                            let playlistLink = message.content.split('play ');
                            playlist(playlistLink);
                        }
                    }
                    else if(message.content.startsWith('>play https://open.spotify.com/track/') || message.content.startsWith('>play https://play.spotify.com/track/'))
                    {

                    }
                    else
                    {
                        let searchResults = message.content.split('play ');
                        let query = searchResults[1];
                        var results = await search(query,opts).catch(err => console.log(err));
                        let url = results.results[0].link;
    
                        if(results)
                        {
                            if(!servers[message.guild.id].queue[0])
                            {
                                embed = new Discord.MessageEmbed()
                                .setColor(colors.indigo)
                                .setTitle(`**${results.results[0].title}**`)
                                .addField('Channel',results.results[0].channelTitle)
                                .addField('URL',results.results[0].link)
                                .setFooter(`Requested by - ${message.author.username}`);
                                message.channel.send({embed: embed});
                            }
                            play(url);
                        }         
                    }
                }

            }
            else
            {
                message.reply('It seems that you do not have the required permission ' + '`' + play_perm + '`');
            }
        
        }
        else
        {
            message.reply('This command has been disabled by an `ADMINISTRATOR`');
        }
    }

    if(command === 'volume') //complete
    {
        if(volume_toggle)
        {
            if(message.member.permissions.has(volume_perm))
            {
                if(args[0])
                {
                    server.volume = args[0];
                    streamOptions = { seek: 0, volume: server.volume };
        
                    embed = new Discord.MessageEmbed()
                    .setColor(colors.indigo)
                    .setTitle(`**Volume Changed**!`)
                    .setDescription(`The volume has been changed to **${server.volume}**`)
                    .setFooter(`Requested by - ${message.author.username}`);
                    message.channel.send({embed: embed});
                }
                else
                {
                    embed = new Discord.MessageEmbed()
                    .setColor(colors.indigo)
                    .setTitle('The current volume level is '+'`'+server.volume+'`')
                    .setFooter(`Requested by - ${message.author.username}`);
                    message.channel.send({embed: embed});
                }

            }
            else
            {
                message.reply('It seems that you do not have the required permission ' + '`' + volume_perm + '`');
            }


        }
        else
        {
            message.reply('This command has been disabled by an `ADMINISTRATOR`');
        }

    }

    if(command === 'leave') //complete
    {
        if(leave)
        {
            if(message.member.permissions.has(leave_perm))
            {
                if(!message.member.voice.channel) return message.channel.send('Please connect to a voice channel');
                if(!message.guild.me.voice.channel) return message.channel.send('Sorry, the bot isn\'t connected to the guild');
                if(servers[message.guild.id].queue[0])
                {
                    servers[message.guild.id].queue = [];
                }

                message.guild.me.voice.channel.leave();
                console.log("Successfully disconnected.");
                embed = new Discord.MessageEmbed()
                .setColor(colors.indigo)
                .setTitle(`Leaving **${message.guild.me.voice.channel.name}**!`)
                .setFooter(`Requested by - ${message.author.username}`);
                message.channel.send({embed: embed});
            }
            else
            {
                message.reply('It seems that you do not have the required permission ' + '`' + leave_perm + '`');
            }
        }
        else
        {
            message.reply('This command has been disabled by an `ADMINISTRATOR`');
        }
    }

    if(command === 'featured') //complete
    {
        if(featured)
        {
            if(message.member.permissions.has(featured_perm))
            {
                embed = new Discord.MessageEmbed()
                .setColor(colors.indigo)
                .setTitle('**Featured Servers**')
                .addField('Citlalli:','https://discord.com/invite/CMmkPtn')
                .addField('Elseco:','https://discord.com/invite/ABu3xud')
                .addField('Nasheyy','https://discord.com/invite/KhW5EeW')
                .setFooter(`Requested by - ${message.author.username}`);
                message.channel.send({embed: embed});
            }
            else
            {
                message.reply('It seems that you do not have the required permission ' + '`' + featured_perm + '`');
            }
        }
        else
        {
            message.reply('This command has been disabled by an `ADMINISTRATOR`');
        }
    }

    if(command === 'request') //needs form
    {
        if(request_toggle)
        {
            if(message.member.permissions.has(request_perm))
            {
                embed = new Discord.MessageEmbed()
                .setColor(colors.indigo)
                .setTitle('**Bot Requests/Ideas**')
                .addField('Google Form:','https://google.com')
                .setFooter(`Requested by - ${message.author.username}`);
                message.channel.send({embed: embed});
            }
            else
            {
                message.reply('It seems that you do not have the required permission ' + '`' + request_perm + '`');
            }
        }
        else
        {
            message.reply('This command has been disabled by an `ADMINISTRATOR`');
        }
    }

    function cache(path,value)
    {
        fs.writeFile(path,fs.readFileSync(path, "utf8")+ message.guild.id+':'+value+';', function (err) {
            if (err) return console.log(err);
          });
    }

    if(command === 'prefix') //complete
    {
        if(prefix_toggle)
        {
            if(message.member.permissions.has(prefix_perm))
            {
                embed = new Discord.MessageEmbed()
                .setColor(colors.indigo)
                .setTitle('The Prefix is '+'`'+prefix+'`')
                .setFooter(`Requested by - ${message.author.username}`);
                message.channel.send({embed: embed});
            } else {
                message.reply('It seems that you do not have the required permission ' + '`' + prefix_perm + '`');
            }


        } else {
            message.reply('This command has been disabled by an `ADMINISTRATOR`');
        }


    }
    
    if(command === 'poll') //complete
    {
        if(poll_toggle)
        {
            if(message.member.permissions.has(poll_perm))
            {
                var pollMsg = message.content.split('poll');
                var pollArray = pollMsg[1].split(';');
                message.delete();
                embed = new Discord.MessageEmbed()
                .setColor(colors.indigo)
                .setTitle(`**${pollArray[0]}**`)
                .addField('**Option 1**:',pollArray[1])
                .addField('**Option 2**:',pollArray[2])
                .setFooter(`Requested by - ${message.author.username}`);
                message.channel.send({embed: embed}).then(sentEmbed => {
                    sentEmbed.react("1️⃣")
                    sentEmbed.react("2️⃣")
                })
            } else {
                message.reply('It seems that you do not have the required permission ' + '`' + poll_perm + '`');
            }
        } else {
            message.reply('This command has been disabled by an `ADMINISTRATOR`');
        }

    }

    function play(link)
    {
        if(servers[message.guild.id].queue[0])
        {
            servers[message.guild.id].queue.push(link);
            embed = new Discord.MessageEmbed()
            .setColor(colors.indigo)
            .setTitle(`**Added to Queue**`)
            .addField('URL:',link)
            .setFooter(`Requested by - ${message.author.username}`);
            message.channel.send({embed: embed});
        }
        else
        {
            servers[message.guild.id].queue.push(link);
            const streamOptions = { seek: 0, volume: volume };
            var voiceChannel = message.member.voice.channel;
            voiceChannel.join().then(connection => {
                const stream = ytdl(link, { filter : 'audioonly' });
                const dispatcher = connection.play(stream, streamOptions);
                dispatcher.on("finish", function() {
                    if(servers[message.guild.id].queue[0]){
                        if(!loop_enable)
                        {
                            servers[message.guild.id].queue.shift();
                            playQueue();
                        }
                        else {
                            playQueue();
                        }

                    } else {
                        return;
                    }
                });
            }).catch(err => console.log(err)); 
        }
    }

    function playQueue()
    {

        const streamOptions = { seek: 0, volume: volume };
        var voiceChannel = message.member.voice.channel;
        voiceChannel.join().then(connection => {
            const stream = ytdl(servers[message.guild.id].queue[0], { filter : 'audioonly' });
            const dispatcher = connection.play(stream, streamOptions);
            dispatcher.on("finish", function() {
                if(!loop_enable)
                {
                    servers[message.guild.id].queue.shift();
                }
                if(servers[message.guild.id].queue[0]){
                    playQueue();
                } else {
                    return;
                }

            });
        }).catch(err => console.log(err)); 
    }

    function skip()
    {
        if(message.member.permissions.has(skip_perm))
        {
            if(servers[message.guild.id].queue[0])
            {
                servers[message.guild.id].queue.shift();
                playQueue();
                embed = new Discord.MessageEmbed()
                .setColor(colors.indigo)
                .setTitle('**Next Track**')
                .setFooter(`Requested by - ${message.author.username}`);
                message.channel.send({embed: embed});
            }
            else
            {
                embed = new Discord.MessageEmbed()
                .setColor(colors.indigo)
                .setTitle('**ERROR**')
                .addField('Error:','You can\'t skip if nothing is in the queue')
                .addField('Queue:',servers[message.guild.id].queue)
                .setFooter(`Requested by - ${message.author.username}`);
                message.channel.send({embed: embed});
            }
        }
        else
        {
            message.reply('It seems that you do not have the required permission ' + '`' + skip_perm + '`');
        }
    }

    if(command === 'skip') //complete
    {
        skip();
    }

    if(command === 'loop') //complete
    {
        if(message.member.permissions.has(loop_perm))
        {
            loop_enable = !loop_enable;
            embed = new Discord.MessageEmbed()
            .setColor(colors.indigo)
            .setTitle('**Loop**')
            .setDescription(loop_enable)
            .setFooter(`Requested by - ${message.author.username}`);
            message.channel.send({embed: embed});
        }
        else
        {
            message.reply('It seems that you do not have the required permission ' + '`' + loop_perm + '`');
        }

    }

    if(command === 'queue') //needs independant queues
    {
        if(queue_toggle)
        {
            if(message.member.permissions.has(queue_perm))
            {
                embed = new Discord.MessageEmbed()
                .setColor(colors.indigo)
                .setTitle('**Queue**')
                .addField('Length:',servers[message.guild.id].queue.length)
                .setFooter(`Requested by - ${message.author.username}`);
                message.channel.send({embed: embed});
            }
            else
            {
                message.reply('It seems that you do not have the required permission ' + '`' + queue_perm + '`');
            }
        }
        else
        {
            message.reply('This command has been disabled by an `ADMINISTRATOR`');
        }

    }

    if(command === 'shuffle') //complete
    {
        if(message.member.permissions.has(shuffle_perm))
        {
            shuffle();
            embed = new Discord.MessageEmbed()
            .setColor(colors.indigo)
            .setTitle('**Queue Shuffled**')
            .setFooter(`Requested by - ${message.author.username}`);
            message.channel.send({embed: embed});
        }
        else
        {
            message.reply('It seems that you do not have the required permission ' + '`' + shuffle_perm + '`');
        }

    }

    function shuffle()
    {
        servers[message.guild.id].queue.sort((a,b)=> 0.5 - Math.random());
    }

    if(command === 'clear') //complete
    {
        if(clear_toggle)
        {
            if(message.member.permissions.has(clear_perm))
            {
                servers[message.guild.id].queue = [];
                embed = new Discord.MessageEmbed()
                .setColor(colors.indigo)
                .setTitle('**Queue Cleared**')
                .setFooter(`Requested by - ${message.author.username}`);
                message.channel.send({embed: embed});
            }
            else
            {
                message.reply('It seems that you do not have the required permission ' + '`' + clear_perm + '`');
            }
        }
        else
        {
            message.reply('This command has been disabled by an `ADMINISTRATOR`');
        }
    }   

    if(command === 'radio')//complete
    {
        function radios()
        {
            embed = new Discord.MessageEmbed()
            .setColor(colors.indigo)
            .setTitle('**Radio Stations**')
            .addField('Popular','`>radio pop`',true)
            .addField('Juice WRLD','`>radio juice`',true)
            .addField('Lakey','`>radio lakey`',true)
            .addField('Lofi','`>radio lofi`',true)
            .addField('Jazz','`>radio jazz`',true)
            .addField('Rap','`>radio rap`',true)
            .addField('Country','`>radio country`',true)
            .addField('Anime','`>radio anime`',true)
            .addField('KPOP','`>radio kpop`',true)
            .addField('Blues','`>radio blues`',true)
            .setFooter(`Requested by - ${message.author.username}`);
            message.channel.send({embed: embed});
        }

        if(radio_toggle)
        {
            if(message.member.permissions.has(radio_perm))
            {
                if(!args[0])
                {
                    radios();
                }
                else if(args[0] == 'top')
                {
                    playlist('https://www.youtube.com/playlist?list=PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU');
                }
                else if(args[0] == 'juice')
                {
                    playlist('https://www.youtube.com/playlist?list=PLeZN5uWYmxWfKMV0Aqgu0hQ90oWkAWtbC');
                }
        
                else if(args[0] == 'lakey')
                {
                    playlist('https://www.youtube.com/playlist?list=PLzQMiS2VoQIVnm_7bh56lb48OmdCMU6Fx');
                }
        
                else if(args[0] == 'lofi')
                {
                    playlist('https://www.youtube.com/playlist?list=PL6NdkXsPL07KiewBDpJC1dFvxEubnNOp1');
                }
                else if(args[0] == 'jazz')
                {
                    playlist('https://www.youtube.com/playlist?list=PL8F6B0753B2CCA128');
                }
                else if(args[0] == 'rap')
                {
                    playlist('https://www.youtube.com/playlist?list=PLetgZKHHaF-Zq1Abh-ZGC4liPd_CV3Uo4');
                }
                else if(args[0] == 'country')
                {
                    playlist('https://www.youtube.com/playlist?list=PLlYKDqBVDxX0Qzmoi2-vvHJjOAy3tRPQ_');
                }
                else if(args[0] == 'anime')
                {
                    playlist('https://www.youtube.com/playlist?list=PLjNlQ2vXx1xbt30X8TcUfNzw_akVISXEu');
                }
                else if(args[0] == 'anime')
                {
                    playlist('https://www.youtube.com/playlist?list=PLjNlQ2vXx1xbt30X8TcUfNzw_akVISXEu');
                }
                else if(args[0] == 'blues')
                {
                    playlist('https://www.youtube.com/playlist?list=PL2140A0411C65DD13');
                }
                else if(args[0] == 'kpop')
                {
                    playlist('https://www.youtube.com/playlist?list=PLOHoVaTp8R7dfrJW5pumS0iD_dhlXKv17');
                }
                else
                {
                    radios();
                }
            }
            else
            {
                message.reply('It seems that you do not have the required permission ' + '`' + radio_perm + '`');
            }
        }
        else
        {
            message.reply('This command has been disabled by an `ADMINISTRATOR`');
        }
    }

    function playlist(url)
    {
        let urlString = url.toString();
        let plID = urlString.split('playlist?list=');
        ps.getPlaylistItems(plID[1])
            .then((result) => {
            if(result)
            {
                var previousQueue = queue.length;
                for(i=0;i<result.total;i++)
                {
                    var total = result.total -1;
                    var totalInt = parseInt(total)+1;
                    if(servers[message.guild.id].queue.length-total==previousQueue)
                    {
                        embed = new Discord.MessageEmbed()
                        .setColor(colors.indigo)
                        .setTitle('Now Playing: `'+totalInt+'` Tracks')
                        .addField('Playlist:',result.playlistTitle)
                        .setFooter(`Requested by - ${message.author.username}`);
                        message.channel.send({embed: embed});
                    }
                    var link = result.items[i].videoUrl;
                    if(servers[message.guild.id].queue[0])
                    {
                        servers[message.guild.id].queue.push(link);
                    }
                    else
                    {
                        servers[message.guild.id].queue.push(link);
                        const streamOptions = { seek: 0, volume: volume };
                        var voiceChannel = message.member.voice.channel;
                        voiceChannel.join().then(connection => {
                            const stream = ytdl(servers[message.guild.id].queue[0], { filter : 'audioonly' });
                            const dispatcher = connection.play(stream, streamOptions);
                            dispatcher.on("finish", function() {
                                if(!loop_enable)
                                {
                                    servers[message.guild.id].queue.shift();
                                }
                                if(servers[message.guild.id].queue[0]){
                                    playQueue(servers[message.guild.id].queue[0]);
                                } else {
            
                                }
                            });
                        }).catch(err => console.log(err)); 
                    }
                }
            }
        }).catch((error) => {console.error(error)});
    }
});

client.login(config.key);