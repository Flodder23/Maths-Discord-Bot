const { Listener } = require("discord-akairo");
const config = require("../config.js");
const isUnit = /[0-9]{5}/g

class UnitRoleListener extends Listener {
	constructor() {
		super(
			"unitRole",
			{
				emitter: "client",
				event: "message"
			}
		);
	}

	async exec(message) {
		if (message.channel.type != "dm" && !message.member.bot && (this.client.testMode == (message.guild.name == "Lonely Joe"))) {
			if (message.channel.name == "unit-roles") {
				let possUnits = message.content.match(isUnit);
				if (possUnits == null) {
					await message.react(config.thumbs_down);
				} else {
					let found_unit = false;
					for (let role of message.guild.roles.cache) {
						for (let unit of possUnits) {
							if (role[1].name.endsWith(unit)) {
								await message.member.roles.add(role[1]);
								found_unit = true;
							}
						}
					}
					if (found_unit) {
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