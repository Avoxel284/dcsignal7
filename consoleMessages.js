const chalk = require("chalk");

/**
 *
 * @param {String} msg Message of error
 * @returns Log
 */
exports.error = (msg) => chalk.redBright(`ERROR: ${msg}`);

/**
 *
 * @param {String} msg Message of warning
 * @returns Log
 */
 exports.warning = (msg) => chalk.rgb(255,80,80)(`WARNING: ${msg}`);