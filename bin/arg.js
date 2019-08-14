#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const args = require("minimist")(process.argv.slice(2));
const chalk = require("chalk").default;
const kitarg = require("../src");
const prompts = require("prompts");

(async () => {

	if (args.generate === "secret" || args.generate === "secret_message") {

		console.info(chalk.cyan("KitARG Secret Message v1.0"));

		const answers = await prompts([

			{

				type: "text",
				name: "hint",
				message: "Hint",
				initial: "None"

			},

			{

				type: "text",
				name: "keys",
				message: "Keys (key1 | key2 | ...)",

			},

			{

				type: "text",
				name: "message",
				message: "Message"

			},

			{

				type: "text",
				name: "file",
				message: "Output File",
				initial: "secret_message.html"

			}

		]);

		const page = await kitarg.generateSecretMessagePage(answers.keys.split("|").map(_ => _.trim()), answers.message, answers.hint.toLowerCase() === "hint" ? undefined : answers.hint);

		fs.writeFileSync(path.join(process.cwd(), answers.file), page);

	} else {

		console.info(chalk.cyan(
`

KitARG Help v1.0

--generate
	= secret
	= secret_message
	-> Generates a secret message page

`))

	}

})();
