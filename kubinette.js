#!/usr/bin/env node
fs 		= require("fs");
colors 	= require("./colors.js");

kubinette				= new Array();
kubinette.version		= "0.0a";
var isArgument			= require("./isArgument.js");
kubinette.displayHeader	= require("./displayHeader.js");
kubinette.parseFile 	= require("./parseFile.js");
kubinette.parseMakefile	= require("./parseMakefile.js");

kubinette.displayHeader();

//	Check Args
for (var a = 2; process.argv[a] && isArgument(process.argv[a]); a++);

//	Check Files
for (var i = a; process.argv[i]; i++)
{
	try
	{
		data = fs.readFileSync(process.argv[i], 'utf8');
		kubinette.parseFile(process.argv[i], data);
	}
	catch (e)
	{
		if (e.code === 'ENOENT')
			console.log(colors.error + "Error! "
				+ colors.reset + process.argv[i] + " does not exist!");
		else if (e.code === 'EACCES')
			console.log(colors.error + "Error! "
				+ colors.reset + "No permission to access " + process.argv[i]);
		else
			throw e;
	}
}

//	Check Makefile
if (i == a)
	kubinette.parseMakefile();