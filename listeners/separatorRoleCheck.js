const { Listener } = require("discord-akairo");

class SeparatorRoleCheckListener extends Listener {
	constructor() {
		super(
			"separatorRoleCheck",
			{
				emitter: "client",
				event: "guildMemberUpdate"
			}
		);
	}

	async exec(oldMember, newMember) {
		if (this.client.testMode == (newMember.guild.name == "Lonely Joe")) {
			let separatorRequired = false
			for(let [id, role] of newMember.guild.roles.cache.sort((a, b) => a.rawPosition - b.rawPosition)) {
				if (role.name.includes("═")) {
					if (separatorRequired && !newMember.roles.cache.has(id)) {
						newMember.roles.add(role)
					} else if (!separatorRequired && newMember.roles.cache.has(id)) {
						newMember.roles.remove(role)
					}
					separatorRequired = false
				} else if (id != newMember.guild.roles.everyone.id) {
					separatorRequired = separatorRequired || newMember.roles.cache.has(id)
				}
			}
		}
	}
}

module.exports = SeparatorRoleCheckListener
