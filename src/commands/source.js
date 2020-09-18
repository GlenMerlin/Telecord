module.exports = {
  name: "Source",
  description: "Gives a message with the source code of the bot",
  execute: (client, message, args) => {
    message.channel.send(
      "My source code is available at <https://github.com/GlenMerlin/Telegram-Discord-Bot>!"
    );
  },
};
