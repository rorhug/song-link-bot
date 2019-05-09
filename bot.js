const { Composer } = require('micro-bot')
// const bot = new Composer()

const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const axios = require('axios')
const url = require('url')


import { getSongLinkData } from './data'


// Export bot handler
module.exports = bot

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
    getSongLinkData(messageUrl.href).then(msg => {
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


