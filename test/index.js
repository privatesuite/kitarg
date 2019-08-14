const fs = require("fs");
const path = require("path");
const kitarg = require("../src");

(async () => {

	let page = await kitarg.generateSecretMessagePage(["trapped griph help", "i want out"], `
	
Congratulations; you've won! Send a message to maki that contains both answers and ask him for a secret tape.

You're now part of an exclusive group of people that have solved this small riddle. Keep this on the down low, as this ARG isn't over yet.

	`.trim());

	fs.writeFileSync(path.join(__dirname, "sm_sample.html"), page);

})();
