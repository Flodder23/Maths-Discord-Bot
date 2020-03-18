const { Listener } = require("discord-akairo");

class WelcomeListener extends Listener {
	constructor() {
		super(
			"welcome",
			{
				emitter: "client",
				eventName: "guildMemberAdd"
			}
		);
	}

	exec(member) {
		if (this.client.testMode != (member.guild.name != "Lonely Joe")) {
			member.guild.systemChannel.send(`Welcome to the **${member.guild.name}** server, ${member}. Put the names of the units you're taking in <#689460678762954801> to get the right roles.`);
		}
	}
}

module.exports = WelcomeListener;