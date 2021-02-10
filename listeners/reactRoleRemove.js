const { Listener } = require("discord-akairo")
const { isRolesMessage } = require("../functions.js")

class ReactRoleRemoveListener extends Listener {
	constructor() {
		super(
			"reactRoleRemove",
			{
				emitter: "client",
				event: "messageReactionRemove"
			}
		);
	}

	async exec(messageReaction, user) {
		let message = messageReaction.message
		let member = await messageReaction.message.guild.members.fetch(user)
		let emoji = messageReaction._emoji
		if (message.id == "809065442223456257" && emoji.name == '👍') {
			await member.roles.remove("809061266617270342")
		}
	}
}

module.exports = ReactRoleRemoveListener;