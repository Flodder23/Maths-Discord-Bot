const { Listener } = require("discord-akairo");
const { isRolesMessage } = require("../functions.js")

class ReactRoleAddListener extends Listener {
	constructor() {
		super(
			"reactRoleAdd",
			{
				emitter: "client",
				event: "messageReactionAdd"
			}
		);
	}

	async exec(messageReaction, user) {
		let message = messageReaction.message;
		let member = await messageReaction.message.guild.members.fetch(user)
		let emoji = messageReaction._emoji
		if (message.id == "809065442223456257" && emoji.name == '👍') {
			await member.roles.add("809061266617270342")
		}
	}
}

module.exports = ReactRoleAddListener;