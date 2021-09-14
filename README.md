# SSGNode  
**S**tatic\
**S**ite\
**G**enerator\
\
This tool allows you to generate web pages from text files.\
You can specify a file/folder to generate into valid html pages. They will appear in `./dist*.`
You can also change the `styles.css` to fit your preferences, it will get copied over to `./dist` and will be applied to all webpages there.\
It also recognizes the first paragraph as a title.

---

## How to use
You should have a `.txt` file or a folder of such files, or instead "Sherlock Holmes Selected Stories" folder with txt contents present for testing this tool.\
\
Make sure to have [node.js](https://nodejs.org/en/download/) installed on your system.\
Then, in the repository run

> npm init

\
If you ever get an error of a missing node module, you can always look at its name (it will have a message *Error: Cannot find module `module`*) and run

> npm install **module**

\
Run in your console

> node index.js

***
### Arguments
You can specify additional options through arguments like so:

> node index.js -argument --argument input

\
To get quick instructions on the arguments do:

 `-h` or `--help`

\
To check the version of the app:

`-v` or `--version`

\
To change the default directory from where the files would be read or the specific file:

`-i` or `--input` 

\
Example of usage:

> node index.js -i cats

*Please note you shouldn't add ./ in the beginning, since the app will do it for you*
\

If you wish so, you also can:

`-hi` or `--hello`
