//Handling arguments
const run = require("./ssgGen");

const yargs = require('yargs/yargs')(process.argv.slice(2));


const argv = yargs.usage('Welcome to SSGNode.')
  .usage("Specify a .txt or .md file or folder to convert into an HTML page.")
  .example("node index.js -i source")
  .options({
    v: {
      alias: "version",
      desc: "Show current version of SSGNode",
      type: "string",
    },
    i: {
      alias: "input",
      desc: "Choose a source to produce HTML page from. Folder or file.",
      type: "string",
    },
    l: {
      alias: "lang",
      desc: "Choose a language of the page to be shown as an <HTML> attribute. Default is EN for English.",
      type: "string",
    },
    c: {
      alias: "config",
      desc: "Choose a config file with options you want to use the program with.",
      type: "string",
    }
  })
  .help("h")
  .alias("h", "help").argv;

if (!(argv.input || argv.config)) {
  console.log("No input path chosen!")
  exit(1);
}

run(argv.input, argv.lang, argv.config);