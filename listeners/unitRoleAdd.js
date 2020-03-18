const { Listener } = require("discord-akairo");
const config = require("../config.js");
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
		if (this.client.testMode != (guild[1].name != "Lonely Joe")) {
			for (let guild of this.client.guilds) {
				if (message.channel.name=="unit-roles") {
					let found_unit = false;
					for (let line of message.content.split("\n")) {
						for (let word of line.split(" ")) {
							word = word.toUpperCase()
							if (isUnit.test(word)) {
								for (let role of message.guild.roles) {
									if (role[1].name == word) {
										await message.member.addRole(role[1])
										found_unit = true;
										break
									}
								}
							}
						}
					}
					if(found_unit) {
						await message.react(config.ok_hand);
					} else {
						await message.react(config.thumbs_down);
					}
				}
			}
		}
	}
}

module.exports = UnitRoleListener;