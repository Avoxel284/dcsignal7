#!/usr/bin/env node

// Avoxel284

const fs = require("fs");
const chalk = require("chalk");
const express = require("express");
const https = require("https");
const socket = require("socket.io");

const config = require(`${__dirname}/lib/config.js`);
const logger = require(`./lib/logger.js`);
const helpcmd = require(`${__dirname}/lib/helpcmd.js`);
const server = require(`${__dirname}/lib/server.js`);

let header = fs.readFileSync(`${__dirname}/templates/banner.txt`, "utf-8");
let currentChannel;
let prefix = "/";
let serverUrl = "";
let serverPort = "443";
let devmode = false;
const consoleTitle = "dcSignal7";

const rl = logger.rl;

/**
 * Initialize
 */
async function init() {
	logger.clear();

	// Set console title
	process.stdout.write(`${String.fromCharCode(27)}]0; ${consoleTitle} ${String.fromCharCode(7)}`);

	// dcSignal header
	console.log(chalk.rgb(33, 111, 237)(header) + "\n");
	if (!chalk.supportsColor) logger.warning("Console doesn't support colours.");

	// Config
	try {
		prefix = config.c()?.settings?.prefix ?? "/";
		serverUrl = config.c().server.url;
		serverPort = config.c().server.port;
		devmode = config.c().settings.devmode;
		logger.success("Successfully loaded configuration");
	} catch (err) {
		throw new Error("Failed to load configuration\n" + err);
	}

	// Check configuration
	if (!serverUrl) throw new Error("Server URL is null");

	await server.authenticate(serverUrl, serverPort);

	logger.inputInit(currentChannel, onLineInput);
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
					logger.success("Enabled devmode");
				} else {
					devmode = false;
					logger.success("Disabled devmode");
				}
				configuration.updateSettings("devmode", devmode);
				break;
			case "users":
			case "online":
				logger.warning("Cannot run command");
				break;
			default:
				logger.warning("Unknown command");
		}
		logger.inputInit(currentChannel, onLineInput);
		return;
	}

	https
		.request({
			host: serverUrl,
			port: serverPort,
			path: "/message",
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		.on("error", logger.error("Failed to send message"))
		.write(
			JSON.stringify({
				content: input,
			})
		);
	logger.inputInit(currentChannel, onLineInput);
};

process.on("exit", () => {
	if (config.c().settings.clearAfterSessionEnd) {
	}
});
