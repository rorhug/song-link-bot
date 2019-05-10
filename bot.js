const data = require('./data')

const { Composer } = require('micro-bot')
// const bot = new Composer()

const Telegraf = require('telegraf')
// const bot = new Telegraf(process.env.BOT_TOKEN)

const axios = require('axios')
const { URL } = require('url')



const PORT = process.env.PORT || 3000
const APP_URL = process.env.NOW_URL

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.telegram.setWebhook(`${APP_URL}/bot${process.env.BOT_TOKEN}`);
bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, PORT)


// Export bot handler
// module.exports = bot

bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username
})


bot.start((ctx) => ctx.reply('Paste a link to a track'))
// bot.help((ctx) => ctx.reply('Help message'))

// bot.on('new_chat_members', (ctx) => {
//   return ctx.reply('Hello ' + ctx.from.first_name + ". Only rule: STICKERS ONLY!")
// })

bot.on('text', (ctx) => {
  let messageUrl
  try {
    messageUrl = new URL(ctx.message)

    data.getSongLinkData(messageUrl.href).then(msg => {
      ctx.reply(msg)
    }).catch(e => {
      ctx.reply("couldn't get de info")
      console.error(e)
    })

  } catch(e) {
    ctx.reply("Doesn't look like a music link...")
    console.error(e)

  }
  
  
})


