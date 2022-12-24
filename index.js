const express = require('express')
const { Telegraf } = require('telegraf')
const dotenv = require('dotenv')
const  { tiktokDown } = require('./req')
const app = express()
dotenv.config()


const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Salom, ${ctx.chat.first_name} TikTok dan videoni suv belgisiz yuklab olishiz uchun, videoni ssilkasini yuboring. `))

bot.url(async(ctx) => {
    try {
        downFunc(ctx)
    } catch (error) {
        console.log(error);
    }
})

bot.command('/support', async(ctx) => {
    await ctx.reply(`Bot support: <a href="https://t.me/rasulov_n7" >Admin: </a> \n @the_rasulov1`,{ parse_mode: "HTML" })
})
bot.command('/channel', async(ctx) => {
    await ctx.reply(`📢 Channel: @rasulovdev \n https://t.me/general_ITblog`)
})
bot.command('/help', async(ctx) => {
    await ctx.reply(`🤖 <a href="https://t.me/tiktok_video_yuklovchibot">TT Dows</a> Bot siz uchun TikTok dan video yuklab olishi mumkin.

    Qanday qilib yuklab olinadi:
     1. TikTok ilovasiga kiring.
     2. Sizga yoqadigan videoni tanlang.
     3. Chap tarafda pastdagi ↪️ tugmasini bosing.
     4. «Ссылка» tugmasini bosing.
     5. Ushbu ssilkani botga yuboring va sizga bot bir necha soniyadan keyin videoni suv belgisiz yuboradi.`,{ parse_mode: "HTML" })
})

async function downFunc(ctx){
    let botLink =  `@tiktok_video_yuklovchibot`
    var link = ctx.message.text  
    var chatID = ctx.chat.id
    const mediaUrl = await tiktokDown(link)
        var tiktokVideo = mediaUrl.play
        ctx.telegram.sendVideo(chatID, tiktokVideo,{caption: `${mediaUrl.title} \n \n ${botLink}`, 
            reply_markup: {
              inline_keyboard: [
                [{ text: "audiosini yuklash", callback_data: "audio" }],
              ],
            },
          })
        
        //API
            bot.action("audio", (ctx) => {
                bot.telegram.sendAudio(chatID, mediaUrl.music, {
                    caption:` ${mediaUrl.title} \n
                    ${botLink}`
                })
            });
  
}



bot.launch()
console.log(`bot server running...`);

app.get('/', function(req, res){
    res.send('bot running...')
})
const port =  process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Server on port ${port}`);
});
 
