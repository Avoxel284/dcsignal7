const chalk = require("chalk");
const barSeparator = "----------------------------------------";
const n = "";

const help = [
	n,
	barSeparator,
	n,
	chalk.bold(`Welcome to dcSignal7!`),
	`dcSignal is a secure end-to-end encrypted messaging system that runs from your terminal.`,
	n,
	chalk.bold(`Here are some useful commands:`),
	`${chalk.blue("%phelp")} Brings up this help screen (duh)`,
	`${chalk.blue("%pdevmode")} Toggles developer mode for advanced information and statistics`,
	`${chalk.blue("%pclear")} Clears the terminal`,
	`${chalk.blue(
		"%pchannel"
	)} Prints the current channel. When used with an argument, it will change the channel.`,
	`${chalk.blue("%ponline")} Prints online users`,
	`${chalk.blue("%pusers")} Same as ${chalk.blue("%ponline")}`,
	n,
	`Please note that the prefix (${chalk.blue("%p")}) can be changed in the config.json file`,
	n,
	barSeparator,
	n,
];

module.exports = () => {
	return help.replaceAll("%p", require(`${__dirname}/../config.json`).c.settings.prefix).join("\n");
};
