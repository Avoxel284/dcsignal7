#!/usr/bin/env node

// Avoxel284

const fs = require("fs");
const chalk = require("chalk");
const express = require("express");
const readline = require("readline");
const https = require("https");
const socket = require("socket.io");

const configuration = require("./config");
const log = require("./logger");
const helpcmd = require("./helpcmd");

let username = "Avoxel284";
let header = fs.readFileSync(__dirname + "/templates/banner.txt", "utf-8");
let app = express();
let currentChannel;
let prefix = "/";
let serverBaseUrl = "";
let port = "443";
let devmode = false;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

/**
 *
 * @param {String} err Error message
 */
function errorHandler(err) {
	console.log(chalk.redBright(`! ${err}`));
	process.exit(1);
}

/**
 * Initialize
 */
async function init() {
	// Clear console
	process.stdout.write("\033c");

	// Console title
	process.stdout.write(String.fromCharCode(27) + "]0;" + "dcSignal7" + String.fromCharCode(7));

	// dcSignal header
	console.log(chalk.rgb(33, 111, 237)(header) + "\n");
	if (!chalk.supportsColor) log.warning("Console doesn't support colours.");

	// Config
	try {
		config = configuration.config;

		prefix = config.settings.prefix ?? "/";
		serverBaseUrl = config.server.dcserver_url;
		port = config.server.port;
		devmode = config.settings.devmode;
		log.success("Successfully loaded configuration");
	} catch (err) {
		throw new Error("Failed to load configuration\n" + err);
	}

	// Check configuration
	if (config?.server?.url == null || config?.server?.url == "")
		throw new Error("Base server URL is null.");

	// Connect and authenticate
	await new Promise((resolve, reject) => {
		https
			.get({ host: serverBaseUrl, port: port, path: "/authenticate", rejectUnauthorized: false })
			.on("error", errorHandler)
			.on("response", () => {
				log.success("Connected and authenticated to server");
				resolve();
			});
	});

	initializeForMessageInput();
}

function initializeForMessageInput() {
	rl.question(`${chalk.blueBright(`#${currentChannel}`)} > `, onLineInput);
	// rl.question("Hello?", (a) => console.log(a));
	// process.stdout.write();
}

init();

onLineInput = async (input) => {
	if (input.charAt(0) === prefix) {
		// Commands
		let params = input.split(" ");
		params[0] = params[0].split(prefix)[1];

		switch (params[0].toLowerCase()) {
			case "help":
				console.log(helpcmd());
				break;
			case "clear":
				process.stdout.write("\033c");
				console.log(`${chalk.gray("dcSignal7 - Cleared client console")}`);
				break;
			case "channel":
				console.log(`${chalk.gray(`Changed channel to ${params[1]}`)}`);
				currentChannel = params[1];
				break;
			case "devmode":
				if (!devmode) {
					devmode = true;
					log.success("Enabled devmode");
				} else {
					devmode = false;
					log.success("Disabled devmode");
				}
				configuration.updateSettings("devmode", devmode);
				break;
			case "users":
			case "online":
				log.warning("Cannot run command");
				break;
			default:
				log.warning("Unknown command");
		}
		initializeForMessageInput();
		return;
	}

	https
		.request({
			host: serverBaseUrl,
			port: port,
			path: "/message",
			method: "POST",
			rejectUnauthorized: false,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		.on("error", errorHandler)
		.write(
			JSON.stringify({
				content: input,
			})
		);
	initializeForMessageInput();
};
