const fs = require("fs");
const { exit } = require("process");
const localUtils = require("./utils");

let endPath = "./dist";

function run(sourcePath, lang, configPath) {
	let configs;
	if (configPath) configs = configReader(configPath);
	if (configs) {
		if (configs.input) sourcePath = configs.input;
		if (configs.lang) lang = configs.lang;
		if (configs.output) endPath = configs.output;
	}

	if (fs.lstatSync(sourcePath).isDirectory()) {
		try {
			fs.readdir(sourcePath, (err, files) => {
				if (err) {
					throw err;
				}
				files.forEach(function (file) {
					if (file.match(".*(.txt|.md)$")) {
						console.log(file);
						console.log("File mathched:");
						console.log(file);
						let contentArray = readFile(`${sourcePath}/${file}`);
						pageGenerator(contentArray, lang);
					}
				});
			});
		} catch (err) {
			console.log(`Error when reading a directory in ${sourcePath}.`);
			console.log(err);
			exit(-1);
		}
	} else {
		try {
			let contentArray = readFile(sourcePath);
			pageGenerator(contentArray, lang);
		} catch (err) {
			console.log(`Error when reading a file in ${sourcePath}.`);
			console.log(err);
			exit(-1);
		}
	}
	console.log(`Website generated from ${sourcePath}`);
	exit(0);
}

function readFile(file) {
	if (file.match(".*(.txt|.md)$")) {
		//read the file
		let fullText = fs.readFileSync(file, "utf8");
		//formatting if it's an .md file
		if (file.match(".*(.md)$")) {
			//replacing strings
			fullText = fullText.replace(/_ /g, "<i>");
			fullText = fullText.replace(/ _/g, "</i>");
			fullText = fullText.replace(/__ /g, "<b>");
			fullText = fullText.replace(/ __/g, "</b>");
			fullText = fullText.replace(/### /g, "<h3>");
			fullText = fullText.replace(/ ###/g, "</h3>");
			fullText = fullText.replace(/## /g, "<h2>");
			fullText = fullText.replace(/ ##/g, "</h2>");
			fullText = fullText.replace(/# /g, "<h1>");
			fullText = fullText.replace(/ #/g, "</h1>");

			fullText = fullText.replace(/---/g, "<hr>");
		}
		//future functionality of choosing the element you want to use
		let element = "p";

		//divide text into paragraphs
		const paragraphs = fullText.split(/\r?\n\r?\n/);

		let title = paragraphs[0];
		let htmlParagraphsArray = [];

		//put them all into an array
		for (let i = 0; i < paragraphs.length; i++) {
			if (i == 0)
			//only the first paragraph is the title
				htmlParagraphsArray.push(`<h1>${title}</h1>`);
			else {
				htmlParagraphsArray.push(
					`<${element}>${paragraphs[i]}</${element}>`,
				);
			}
		}

		//put them all into a single string, every paragraph starts from a new line
		let texts = htmlParagraphsArray.join("\n");
		return { texts: texts, title: title };
	}
}

function pageGenerator(contentArray, lang) {
	let html;
	try {
		html = genPage(contentArray["texts"], contentArray["title"], lang);
	} catch (err) {
		console.log(
			`Error when generating an html file for ${contentArray["title"]}.`,
		);
		console.log(err);
		exit(-1);
	}
	output(html);
}

function genPage(texts, title, lang) {
	const html = `
  <!DOCTYPE html>
  <html lang="${lang}">
  <head>
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
  </style>
  <link rel="stylesheet" href="./styles.css">
  <title>${title}</title>
  </head>
  <body>
  <div class="container">
  ${texts}
  </div>
  </body>
  </html>
  `;
	return html;
}

function output(html) {
	localUtils.mkExist(endPath);
	deleteFiles(endPath);
	generateFile(html);
	genCss(endPath);
}

//to remove all previous files
function deleteFiles(folder) {
	try {
		fs.rmSync(folder, { recursive: true }, (err) => {
			if (err) throw { err };
		});
	} catch (err) {
		console.log(`Error when deleting files in ${folder}.`);
		console.log(err);
		exit(-1);
	}
}

function generateFile(html) {
	localUtils.mkExist(endPath);

	try {
		fs.writeFileSync(`${endPath}/output.html`, html, function (err) {
			if (err) {
				return console.log(err);
			}
			console.log("web page generated");
		});
	} catch (err) {
		console.log(`Error when creating an html file in ${endPath}.`);
		console.log(err);
		exit(-1);
	}
}

function configReader(config) {
	try {
		//parse the file and check for the arguments.
		const configJSON = JSON.parse(fs.readFileSync(config, "utf8"));

		return configJSON;
	} catch (error) {
		console.log(`ERROR: ${error}`);
		exit(-1);
	}
}

function genCss(dir) {
	localUtils.mkExist(dir);
	localUtils.mkExist(`${dir}/styles.css`, false);

	try {
		fs.copyFileSync("./styles.css", `${dir}/styles.css`);
	} catch (err) {
		console.log(`Error when copying a css file to ${dir}.`);
		console.log(err);
		exit(-1);
	}
}

module.exports = {
	run, 
	genPage
}
