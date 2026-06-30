const { Telegraf } = require("telegraf");
require("dotenv").config();
const gem = require("./gemini"); // Make sure your gemini.js returns the text from its run() function!
const marked = require('marked');
const { parse } = require("dotenv");
const express = require('express')

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/",(req,res) => {
    res.send("Bot is running!")
})

bot.start(ctx => {
    ctx.reply("Welcome to chat with google bot");
});

bot.on('text', async (ctx) => {
    try {
        let gemResponse = await gem.run(ctx.message.text);
        // let parsedResponse = await marked.parse(gemResponse)
        await ctx.reply(gemResponse,{parse_mode : "HTML"});
    } catch (error) {
        console.error("Error handling message:", error);
        ctx.reply("Sorry, something went wrong processing that.");
    }
});

bot.launch()
  .then(() => console.log('Bot is successfully running...'))
  .catch((err) => console.error('Failed to launch bot:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

app.listen(PORT, () => {
    console.log(`Server is happily running at http://localhost:${PORT}`);
});