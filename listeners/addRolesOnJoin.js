const { Listener } = require("discord-akairo");

class WelcomeListener extends Listener {
	constructor() {
		super(
			"addRolesOnJoin",
			{
				emitter: "client",
				event: "guildMemberAdd"
			}
		);
	}

	async exec(member) {
		if (this.client.testMode == (member.guild.name == "Lonely Joe")) {
			if (!member.user.bot) {
				await member.roles.add(member.guild.roles.cache.find(r => r.name == "Student"))
			}
		}
	}
}

module.exports = WelcomeListener;