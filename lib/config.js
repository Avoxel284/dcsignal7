// Avoxel284
// Module for interacting with configuration file

const fs = require("fs");

const configurationFile = fs.readFileSync(`${__dirname}/../config.json`, "utf-8");
let config = JSON.parse(configurationFile);

/**
 * Returns exposed configuration object
 * @returns {Object} Configuration object
 */
module.exports.c = () => JSON.parse(fs.readFile(`${__dirname}/../config.json`, "utf-8"));

/**
 * Update value in configuration file
 * @param {String} key Key to index value
 * @param {String} value Value to update
 * @returns {Promise} Resolve with updated config or reject with error
 */
module.exports.u = (key, value) => {
	return new Promise((res, rej) => {
		if (!key || !value) throw new Error("Key or value null!");
		config.settings[key] = value;

		fs.writeFile("config.json", JSON.stringify(config), (err) => {
			if (err) rej(err);
			res(config);
		});
	});
};
