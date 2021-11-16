// Avoxel284

const fs = require("fs");
const chalk = require("chalk");

const messages = require("./consoleMessages");

let username = "Avoxel284";
let header = fs.readFileSync("./header.txt", "utf-8");

console.log(chalk.blueBright(header));
if (!chalk.supportsColor) console.log(messages.warning("Console doesn't support colours."));
console.log()
console.log(
	`Welcome, ${username}! Successfully connected and logged in to server.\nServer time: ${"00:00"}`
);
