const { Listener } = require("discord-akairo");
const Discord = require("discord.js");

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
		if (this.client.testMode) {
			console.log("Started in testing mode.");
		} else {
			console.log("Started in normal mode.");
		}
	}
}

module.exports = ReadyListener;