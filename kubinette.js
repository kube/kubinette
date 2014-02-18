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

kubinette.loadFile = function(fileName)
{
	// Dirty way
	if (fileName == "")
		return ;
	try
	{
		data = fs.readFileSync(fileName, 'utf8');
		kubinette.parseFile(fileName, data);
	}
	catch (e)
	{
		if (e.code === 'ENOENT')
			console.log(colors.error + "Error! "
				+ colors.reset + "-" + fileName + "- does not exist!");
		else if (e.code === 'EACCES')
			console.log(colors.error + "Error! "
				+ colors.reset + "No permission to access " + fileName);
		else
			throw e;
	}
}

//	Check Args
for (var a = 2; process.argv[a] && isArgument(process.argv[a]); a++);

//	Check Files
for (var i = a; process.argv[i]; i++)
{
	kubinette.loadFile(process.argv[i]);
}

//	Check Makefile
if (i == a)
	kubinette.parseMakefile();