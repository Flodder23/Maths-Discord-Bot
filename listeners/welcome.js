const { Listener } = require("discord-akairo");

class WelcomeListener extends Listener {
	constructor() {
		super(
			"welcome",
			{
				emitter: "client",
				event: "guildMemberAdd"
			}
		);
	}

	exec(member) {
		if (this.client.testMode == (member.guild.name == "Lonely Joe")) {
			if (member.guild.systemChannel.name == "unit-roles") {
				channel_name = "this channel"
			} else {
				channel_name = "<#689460678762954801>"
			}
			member.guild.systemChannel.send(`Welcome to the **${member.guild.name}** server, ${member}! Put the names of the units you're taking in ${channel_name} to be assigned the appropriate roles.`);
		}
	}
}

module.exports = WelcomeListener;