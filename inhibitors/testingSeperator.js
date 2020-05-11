const { Inhibitor } = require('discord-akairo');

class testingSeperatorInhibitor extends Inhibitor {
    constructor() {
        super(
            "testingSeperator",
            {
                reason: "blacklist",
                type: "all"
            }
        )
    }

    exec(message) {
        return !(!message.author.bot && this.client.testMode == (message.guild.name == "Lonely Joe"))
    }
}

module.exports = testingSeperatorInhibitor;