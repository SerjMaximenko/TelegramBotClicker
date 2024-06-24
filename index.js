// const TelegramApi = require('node-telegram-bot-api')
//
// const token = '7310031848:AAEpobPhjc3Htv8B5MrXyRSUqN1ExDo6h-s'
//
// const bot = new TelegramApi(token, {polling: true})
//
// bot.on("message", msg =>{
//     console.log(msg);
// })
//
// bot.gameQuery((ctx) => {
//     let queryId = ctx.callbackQuery.id
//     let gameurl = "https://dazzling-ritchie-f3ad20.netlify.app/?id="+queryId;
//     ctx.answerGameQuery(gameUrl)
// })

// const { Telegraf, Markup } = require('telegraf')
//
// const token = '7310031848:AAEpobPhjc3Htv8B5MrXyRSUqN1ExDo6h-s'
//
// const gameShortName = 'ClickerMaximenBot'
// const gameUrl = 'https://serjmaximenko.github.io/Clicker/'
//
// const markup = Markup.inlineKeyboard([
//     Markup.button.game('🎮 Play now!'),
//     Markup.button.url('Telegraf help', 'http://telegraf.js.org')
// ])
//
// const bot = new Telegraf(token)
// bot.start((ctx) => ctx.replyWithGame(gameShortName))
// bot.command('foo', (ctx) => ctx.replyWithGame(gameShortName, markup))
// bot.gameQuery((ctx) => ctx.answerGameQuery(gameUrl))
// bot.launch()
//
// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))

const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "7310031848:AAEpobPhjc3Htv8B5MrXyRSUqN1ExDo6h-s";
const bot = new TelegramBot(TOKEN, {
    polling: true
});
const port = process.env.PORT || 5000;
const gameName = "ClickerGame";
const queries = {};
bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "Say /game if you want to play."));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));
bot.on("callback_query", function (query) {
    if (query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
    } else {
        queries[query.id] = query;
        let gameURL = "https://serjmaximenko.github.io/Clicker/";
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url: gameURL
        });
    }
});
bot.on("inline_query", function (iq) {
    bot.answerInilneQuery(iq.id, [{
        type: "game",
        id: "0",
        game_short_name: gameName
    }]);
});

bot.on("message", msg =>{
    const chatID = msg.chat.id;
    console.log(msg);

    if (msg === '/start') {
        bot.sendMessage(chatID, "http://t.me/ClickerMaximenBot?game=ClickerGame")
    }
})

