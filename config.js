// Avoxel284
// Module for interacting with configuration file

const fs = require("fs");

const configurationFile = fs.readFileSync("./config.json", "utf-8");
let config = JSON.parse(configurationFile);

/**
 * Exposed configuration object
 */
module.exports.config = config;

/**
 * Update value in configuration file
 * @param {String} key Key to index value
 * @param {String} value Value to update
 * @returns {Promise} Resolve with updated config or reject with error
 */
module.exports.updateSettings = (key, value) => {
	return new Promise((res, rej) => {
		if (key == null || value == null) throw new Error("Key or value null!");
		config.settings[key] = value;

		fs.writeFile("./config.json", JSON.stringify(config), (err) => {
			if (err) rej(err);
			res(config);
		});
	});
};
