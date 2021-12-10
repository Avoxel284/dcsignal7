const chalk = require("chalk");
const barSeparator = "----------------------------------------";
const p = require("./config").config.settings.prefix;
const n = "";

const help = [
	n,
	barSeparator,
	n,
	chalk.bold(`Welcome to dcSignal7!`),
	`dcSignal is a secure end-to-end encrypted messaging system that runs from your terminal.`,
	n,
	chalk.bold(`Here are some useful commands:`),
	`${chalk.blue(p + "help")} Brings up this help screen (duh)`,
	`${chalk.blue(p + "devmode")} Toggles developer mode for advanced information and statistics`,
	`${chalk.blue(p + "clear")} Clears the terminal`,
	`${chalk.blue(
		p + "channel"
	)} Prints the current channel. When used with an argument, it will change the channel.`,
	`${chalk.blue(p + "online")} Prints online users`,
	`${chalk.blue(p + "users")} Same as ${chalk.blue(p + "online")}`,
	n,
	`Please note that the prefix (${chalk.blue(p)}) can be changed in the config.json file`,
	n,
	barSeparator,
	n,
];

module.exports = () => {
	return help.join("\n");
};
