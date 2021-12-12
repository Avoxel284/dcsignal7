// Avoxel284
// Module for creating console.log templates

const chalk = require("chalk");

/**
 * @param {String} msg Message
 * @returns Console log
 */
exports.error = (msg) => console.log(chalk.redBright(`! ERROR: ${msg}`));

/**
 * @param {String} msg Message
 * @returns Console log
 */
exports.warning = (msg) => console.log(chalk.rgb(242, 156, 17)(`! WARNING: ${msg}`));

/**
 * @param {String} msg Message
 * @returns Console log
 */
exports.success = (msg) => console.log(chalk.greenBright(`✓ ${msg}`));

/**
 * Clears the console
 */
exports.clear = () => process.stdout.write("\033c");