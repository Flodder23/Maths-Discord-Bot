const { Listener } = require("discord-akairo");
const Discord = require("discord.js");
const config = require("../config.js")

class ReadyListener extends Listener {
	constructor() {
		super(
			"ready",
			{
				emitter: "client",
				event: "ready"
			}
		);
	}

	async exec() {
		let output = ""
		let ownerUser;
		if (this.client.testMode) {
			output += "Started in testing mode\n"
		} else {
			output += "Started in normal mode\n"
		}
		for (let [, guild] of this.client.guilds.cache.filter(g => this.client.testMode != (g.name != "Lonely Joe"))) {
			await guild.members.fetch()
			if (!ownerUser) {
				let ownerMember = guild.members.cache.find(m => m.id == this.client.ownerID)
				if (ownerMember) {
					ownerUser = ownerMember.user
				}
			}
			let units_channels = 0
			for (let [, channel] of guild.channels.cache) {
				if (channel.name == "add-units") {
					units_channels ++
				}
				if (channel.name == "server-info") {
					for (let [, message] of await channel.messages.fetch({ limit: 100 })) {
						if (message.id == "809065442223456257") {
							output += `Found socials message for ${guild.name}\n`
						}
					}
				}
			}
			output += `Found ${units_channels} #add-units channel(s) for ${guild.name}\n`
		}
		output = output.trim()
		if (this.client.testMode) {
			console.log(output)
		} else {
			if (ownerUser) {
				await ownerUser.send({embed:{
					title: "Bot Restarted",
					description: output,
					color: config.colour,
					fields: [
						{
							name: "Release Info",
							value: `[Commit](https://github.com/JosephLGibson/Pizza-Bot/commit/${process.env.HEROKU_SLUG_COMMIT})
							**Release Version**: ${process.env.HEROKU_RELEASE_VERSION}
							**Released on**: ${process.env.HEROKU_RELEASE_CREATED_AT}
							**Deploy Description**: ${process.env.HEROKU_SLUG_DESCRIPTION}`
						}
					],
					timestamp: new Date()
				}})
			} else {
				console.log(output)
			}
		}
		return await this.client.user.setPresence(
			{
				status: "online",
				activity: {
					name: "=help",
					type: "LISTENING"
				}
			}
		)
	}
}

module.exports = ReadyListener;