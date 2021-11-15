## Install things! ##

### Node JS ###

Make sure to have [node.js](https://nodejs.org/en/download/) installed on your system.  
Then, in the repository run
```
npm install
```

If you ever get an error of a missing node module, you can always look at its name (it will have a message *Error: Cannot find module `module`*) and run
```
npm install **module**
```

Run in your console
```
node index.js
```
***

### Prettier ###
Install [prettier] (https://prettier.io/docs/en/install.html)
To quickly format the project, run
```
npx prettier --write .
```

### ESLint ###
Install [ESLint] (https://eslint.org/docs/user-guide/getting-started)
It will help you to find errors, inconsistencies.
Run
```
npm run lint
```
To format according to the project style

### VSCode integration ###
`.vscode/settings.json` is configured to use prettier as a formatter on saving the project.
VSCode addons **prettier** and **eslint** can be installed to have it underline problems with your format. Just search those names in **Extensions**
You don't have to have them, you can just use the command line instead. (I know *some* people have problems with prettier extension...)

### Unit tests ###
We use [jest] (https://jestjs.io/docs/getting-started) for unit testing. If you see something that is untested, please contribute!
To run all existing tests, do
```
npm test
```

## Feel free to contribute! ##
Please communicate goals of your contributions, or document your commits to make it easier to review.
Use the above tools before doing a PR to have consistent code style.