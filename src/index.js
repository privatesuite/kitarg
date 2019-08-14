const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const aesjs = require("aes-js");
const sha256 = require("js-sha256");

const templates_root = path.join(__dirname, "..", "templates");

module.exports = {

	async generateSecretMessagePage (keys, message, hint) {

		keys = keys.map(_ => _.toLowerCase());

		let aesCtr = new aesjs.ModeOfOperation.ctr(sha256.digest(keys.join("|")), new aesjs.Counter(5));
		message = aesCtr.encrypt(aesjs.utils.utf8.toBytes(message));

		return new Promise((resolve, reject) => {

			ejs.renderFile(path.join(templates_root, "secret_message", "index.ejs"), {
				
				hint,
				keys: keys.length,
				message: JSON.stringify([...message])

			}, (err, str) => {

				if (err) reject(err);
				else resolve(str);

			});

		});

	}

}
