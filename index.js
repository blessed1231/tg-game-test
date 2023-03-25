const TelegramApi = require('node-telegram-bot-api')

const token = '6228102994:AAESzJihA_3se52VwQhRanvcH8amPRDPJyE'
const {opts, againOpts} = require('./options')
const bot = new TelegramApi(token, {polling: true})

const chats = {}




bot.setMyCommands([
    {command: '/start', description: 'Start greeting'},
    {command: '/info', description: 'Your name & surname'},
    {command: '/game', description: 'Играю на мать'},

])

const  startGame = async (chatid) => {
    await bot.sendMessage(chatid, 'Сейчас я загадаю цыфру от 1 до 10, попробуй угадать')
    const randomNum = Math.floor(Math.random() * 10)
    chats[chatid] = randomNum;
   await bot.sendMessage(chatid, 'Отгадывай.', opts)
}

const start  = () => {
    bot.on('message', async msg => {

        const text = msg.text;
        const chatId = msg.chat.id;
console.log(msg)
        if (text === '/start') {
            // console.log(msg)
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/295/9aa/2959aa13-4340-3e8e-bff4-991a332a9247/96/5.webp')
          return  bot.sendMessage(chatId, 'Телеграм бот (тестовый) кратенко, велкам')
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Твое имя: ${msg.from.first_name} ${msg.from.last_name}`)
        }

        if (text === '/game') {
           return  startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю ебанат')
    })


    bot.on('callback_query' , msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if (data === '/again') {
                return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `Ты угадал!!!!!!! красава бро цыфра  - ${chats[chatId]}`, againOpts)
        } else {
            return bot.sendMessage(chatId, `Не угадал, ты ебанат - цыфра - ${chats[chatId]}`, againOpts)
        }
    })
}

start()