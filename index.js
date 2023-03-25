const TelegramApi = require('node-telegram-bot-api')

const token = '6228102994:AAESzJihA_3se52VwQhRanvcH8amPRDPJyE'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'текст', callback_data: ''}]
        ]
    })
}


bot.setMyCommands([
    {command: '/start', description: 'Start greeting'},
    {command: '/info', description: 'Your name & surname'},
    {command: '/game', description: 'Играю на мать'},

])


const start  = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            console.log(msg)
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/295/9aa/2959aa13-4340-3e8e-bff4-991a332a9247/96/5.webp')
          return  bot.sendMessage(chatId, 'Телеграм бот (тестовый) кратенко, велкам')
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Твое имя: ${msg.from.first_name} ${msg.from.last_name}`)
        }

        if (text === '/game') {
            await bot.sendMessage(chatId, 'Сейчас я загадаю цыфру от 1 до 10, попробуй угадать')
            const randomNum = Math.floor(Math.random() * 10)
            chats[chatId] = randomNum;
            return bot.sendMessage(chatId, 'Отгадывай.', gameOptions)
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю ебанат')
    })
}

start()