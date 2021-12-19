// Avoxel284
// Module for creating console.log templates

const chalk = require("chalk");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

/**
 * Exposes readline interface
 */
exports.rl = rl;

/**
 * Prepare console for input
 * @param {String} prompt Input prompt
 * @param {Function} callback On line input callback function
 */
exports.inputInit = (prompt, callback) => {
	if (!callback) throw new Error("No callback function given.");
	rl.question(`${chalk.blueBright(`#${prompt}`)} > `, callback);
};

/**
 * @param {String} msg Message
 * @returns Console log
 */
exports.error = (msg) => {
	exports.clearLine();
	console.log(chalk.redBright(`! ERROR: ${msg}`));
};

/**
 * @param {String} msg Message
 * @returns Console log
 */
exports.warning = (msg) => {
	exports.clearLine();
	console.log(chalk.rgb(242, 156, 17)(`! WARNING: ${msg}`));
};

/**
 * @param {String} msg Message
 * @returns Console log
 */
exports.success = (msg) => {
	exports.clearLine();
	console.log(chalk.greenBright(`✓ ${msg}`));
};

/**
 * Clears the console
 */
exports.clear = () => process.stdout.write("\033c");

/**
 * Clears the current line of the console
 */
exports.clearLine = () => {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
};
