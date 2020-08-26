const { Listener } = require("discord-akairo");
const config = require("../config.js");

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
		if (message.channel.type != "dm" && !message.member.user.bot && (this.client.testMode == (message.guild.name == "Lonely Joe"))) {
			if (message.channel.name == "unit-names") {
				let possUnits = message.content.match(/[0-9]{5}/g);
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
				return await message.delete({ timeout: 3000 })
			}
		}
	}
}

module.exports = UnitRoleListener;