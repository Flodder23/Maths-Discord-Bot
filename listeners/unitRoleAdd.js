const { Listener } = require("discord-akairo");
const isUnit = /MATH[0-9]{5}/

class UnitRoleListener extends Listener {
	constructor() {
		super(
			"message",
			{
				emitter: "client",
				eventName: "message"
			}
		);
	}

	async exec(message) {
		if (this.client.testMode) {
			console.log("Started in testing mode.");
		} else {
			console.log("Started in normal mode.");
		}
		for (let guild of this.client.guilds) {
			if (this.client.testMode != (guild[1].name != "Lonely Joe")) {
				if (message.channel.name=="unit-roles") {
					for (let line of message.content.split("\n")) {
						for (let word of line.split(" ")) {
							word = word.toUpperCase()
							if (isUnit.test(word)) {
								for (let role of message.guild.roles) {
									if (role[1].name == word) {
										message.member.addRole(role[1])
										break
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

module.exports = UnitRoleListener;