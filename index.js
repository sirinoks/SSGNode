//Handling arguments
const run = require("./ssgGen");
const yargs = require("yargs/yargs")
  .usage("bla bla")
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
      demandOption: true
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
  .alias("h", "help").yargs;

console.log(yargs);

if (!(yargs.input || yargs.config)) {
  console.log("No input path chosen!")
  exit(1);
}

run(yargs.input, yargs.lang, yargs.config);