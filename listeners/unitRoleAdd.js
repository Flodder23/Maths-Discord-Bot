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
				let toAdd = [],
					toRemove = [],
					possUnits = message.content.match(/\d{5}/g)
				if (possUnits) {
					for (let unit of possUnits) {
						let role = message.guild.roles.cache.find(r => r.name.includes(unit))
						if (role) {
							if (message.member.roles.cache.has(role.id)) {
								toRemove.push(role)
							} else {
								toAdd.push(role)
							}
						}
					}
				}
				if (toAdd.length == 0) {
					if (toRemove.length == 0) {
						await message.react(config.thumbs_down)
					} else {
						message.member.roles.remove(toRemove)
						await message.react(config.ok_hand)
					}
				} else {
					message.member.roles.add(toAdd)
					await message.react(config.ok_hand)
				}
				return await message.delete({ timeout: 3000 })
			}
		}
	}
}

module.exports = UnitRoleListener;