# SSGNode
**S**tatic
**S**ite
**G**enerator

This tool allows you to generate web pages from text files.

##How to use
You should have a "Sherlock Holmes Selected Stories" folder with txt contents present for testing this tool.

Run in your console
> node index.js

###Arguments
You can specify additional options through arguments like so:
> node index.js -argument --argument input

To get quick instructions on the arguments do
> -h or --help

To check the version of the app:
> -v or --version

To change the default directory from where the files would be read or the specific file:
> -i or --input 

Example of usage:
> node index.js -i cats
*Please note you shouldn't add ./ in the beginning, since the app will do it for you*

If you wish so, you also can:
> -hi or --hello