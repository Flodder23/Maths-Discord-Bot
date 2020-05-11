const { Command } = require("discord-akairo");
const config = require("../config.js");

const commandInfo = {
	id: "ask",
	aliases: ["yesno"],
	args: [{id: "message", type: "string", default: "", match: "content"}],
	description: {
		short: "Ask a yes/no question.",
		extend: "",
	}
}

commandInfo.aliases.unshift(commandInfo.id)
commandInfo.description.long = commandInfo.description.short + "\n" + commandInfo.description.extend
commandInfo.description.args = commandInfo.args.map(item => item.id)

class AskCommand extends Command {
	constructor() {
		super(
			commandInfo.id,
			commandInfo
		);
	}

	async exec(message, args) {
		if (args.message == ""){
			let rep = await message.reply("can't ask an empty question!")
			await rep.delete({timeout: 5000});
		} else {
			let name = message.member.user.username + "#" + message.member.user.discriminator
			let start;
			if (message.member.nickname == null) {
				start = name
			} else {
				start = message.member.nickname + ` (${name})`
			}
			let sent = await message.channel.send(`**${start}** asked: ${args.message}`);
			await sent.react(config.thumbs_up);
			await sent.react(config.thumbs_down);
		}
		if (message.channel.type != "dm") {
			return await message.delete();
		}
	}
}

module.exports = AskCommand;
