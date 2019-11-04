const TelegramBot = require('node-telegram-bot-api');
const dessertGenerator = require('random-dessert-generator');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  var keys = [];
  keys.push({text: "dessert", callback_data: "dessert"});
  keys.push({text: "yummy dessert", callback_data: "yummy"});
  var options = { reply_markup: ({inline_keyboard: [ keys ]}) };
  bot.sendMessage(chatId, "Your choices:", options);
});

bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  var dessert;
  switch (callbackQuery.data) {
    case 'dessert':
      dessert = dessertGenerator.generateDessert();
      break;
    case 'yummy':
      dessert = dessertGenerator.generateYummyDessert();
      break;
  }
  bot.answerCallbackQuery(callbackQuery.id, { text: dessert });
  bot.sendMessage(chatId, dessert);
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.onText(/\/dessert/, (msg) => {
  const chatId = msg.chat.id;
  const dessert = dessertGenerator.generateDessert();

  bot.sendMessage(chatId, dessert);
});

bot.onText(/\/yummy/, (msg) => {
  const chatId = msg.chat.id;
  const dessert = dessertGenerator.generateYummyDessert();

  bot.sendMessage(chatId, dessert);
});
