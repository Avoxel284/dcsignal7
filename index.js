#!/usr/bin/env node
// Avoxel284

const fs = require("fs");
const chalk = require("chalk");
const json5 = require("json5");
const express = require("express");
const readline = require("readline");
const https = require("https");

const messages = require("./consoleMessages");

let username = "Avoxel284";
let header = fs.readFileSync("./header.txt", "utf-8");
let config = {};
let app = express();
let currentChannel;
let prefix = "/";
let serverBaseUrl = "";
let port = "443";

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
	console.log(chalk.blueBright(header) + "\n");
	if (!chalk.supportsColor) console.log(messages.warning("Console doesn't support colours."));

	// Config
	try {
		let configuration = fs.readFileSync("./config.json5", "utf-8");
		config = json5.parse(configuration);
		prefix = config.SETTINGS.PREFIX ?? "/";
		serverBaseUrl = config.SETTINGS.DCSERVER_URL;
		port = config.SETTINGS.PORT;
		console.log(chalk.greenBright(`✓ Successfully loaded configuration`));
	} catch (err) {
		throw new Error("Failed to load configuration\n" + err);
	}

	// Check configuration
	if (config.SETTINGS.DCSERVER_URL == null || config.SETTINGS.DCSERVER_URL == "")
		throw new Error("Base server URL is null.");

	if (
		config.CREDENTIALS.USERNAME == null ||
		config.CREDENTIALS.PASSWORD == null ||
		config.CREDENTIALS.USERNAME == "" ||
		config.CREDENTIALS.PASSWORD == ""
	)
		throw new Error("Please enter your credentials in config.json5");

	// Connect and authenticate
	https
		.get({ host: "localhost", port: "8443", path: "/authenticate", rejectUnauthorized: false })
		.on("error", errorHandler)
		.on("response", () => {
			console.log(chalk.greenBright(`✓ Connected and authenticated to server.`));
		});

	initializeForMessageInput();

	// https
	// 	.request(
	// 		{
	// 			host: "localhost",
	// 			port: "8443",
	// 			path: "/authenticate",
	// 			method: "GET",
	// 			rejectUnauthorized: false,
	// 		},
	// 		(res) => {
	// 			console.log(res);
	// 			res.on("data", (d) => {
	// 				process.stdout.write(d);
	// 			});
	// 		}
	// 	)
}

function initializeForMessageInput() {
	process.stdout.write(`${chalk.blueBright(`#${currentChannel}`)} > `);
}

init();

rl.on("line", (input) => {
	let msg = input; // might modify the message later

	process.stdout.clearLine(false); // clear the input line
	process.stdout.cursorTo(0);

	if (input.charAt(0) === prefix) {
		// Commands
		let params = msg.split(" ");
		params[0] = params[0].split(prefix)[1];

		switch (params[0].toLowerCase()) {
			case "clear":
				process.stdout.write("\033c");
				console.log(`${chalk.gray("dcSignal7 - Cleared client console")}`);
				break;
			case "channel":
				console.log(`${chalk.gray(`Changed channel to ${params[1]}`)}`);
				currentChannel = params[1];
				break;
			case "users":
			case "online":
				console.log(`${chalk.redBright("Cannot run")}`);
				break;
			default:
				console.log(`${chalk.redBright("Unknown command")}`);
		}
		initializeForMessageInput();
		return;
	}

	initializeForMessageInput();
});
