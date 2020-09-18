const { execute } = require("./ping");

const { userModel } = require("../models/User");

module.exports = {
  name: "delete",
  description:
    "This command lets users delete their accounts stored in the bot's DB",
  async execute(client, message, args) {
    userModel.findOne({ name: message.author.id }, function (err, users) {
      if (err) return;
      if (users != null) {
        const filter = (response) => {
          return message.content;
        };
        try {
          message.channel
            .send(
              "Just to be clear you are trying to delete your account right now, if you proceed your account will be deleted...\nType **t.confirm** to confirm your decision (if you did this by mistake just wait 30 seconds)"
            )
            .then(() => {
              message.channel
                .awaitMessages(filter, {
                  max: 1,
                  time: 30000,
                  errors: ["time"],
                })
                .then((collected) => {
                  userModel.deleteOne({ name: message.author.id });
                  message.channel.send(
                    `Account deleted successfully, if you change your mind you can always sign up again with **t.register**`
                  );
                })
                .catch((collected) => {
                  message.channel.send(
                    `Didn't get confirmation within thirty seconds, your account has been perserved.`
                  );
                });
            });
        } catch (e) {
          console.log(e);
        }
      } else {
        return message.channel.send(
          "You are not registered in the database, if you want to register see **t.help**"
        );
      }
    });
  },
};
