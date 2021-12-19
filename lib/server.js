// Avoxel284
// Module for interacting with the server

const socket = require("socket.io");
const https = require("https");

const logger = require(`${__dirname}/logger.js`);

/**
 * Attempts to authenticate to the server
 *
 * @param {String} url Server API URL
 * @param {String} port Port
 * @returns {}
 */
exports.authenticate = async (url, port) => {
	https
		.get({ host: url, port: port, path: "/authenticate", rejectUnauthorized: false })
		.on("error", logger.error)
		.on("response", () => {
			logger.success("Connected and authenticated to server");
		});
};
