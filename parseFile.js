/*
**	File Parser
*/

function	checkFunctions(name, data)
{
	// This Regex still doesn't match functions as parameters
	// var functionsLocationRegex = /^([\t\s]+)([0-9a-zA-Z_]+ )?([0-9a-zA-Z_]+)([\t\s]+)(\**)([\t\s]+)?([0-9a-zA-Z_]+)\(((([0-9a-zA-Z_]+ )?([0-9a-zA-Z_]+)([\t\s]+)?(\**)([\t\s]+)?([0-9a-zA-Z_]+)(, ))*(([0-9a-zA-Z_]+ )?([0-9a-zA-Z_]+)([\t\s]+)?(\**)([\t\s]+)?([0-9a-zA-Z_]+)))?\)/mgi;
	var	functionsLocationRegex = /^([\t\s]+)([0-9a-zA-Z_]+ )?([0-9a-zA-Z_]+)([\t\s]+)(\**)([\t\s]+)?([0-9a-zA-Z_]+)\(((([0-9a-zA-Z_]+ )?([0-9a-zA-Z_]+)([\t\s]+)?(\**)([\t\s]+)?([0-9a-zA-Z_]+)(, ))*(([0-9a-zA-Z_]+ )?([0-9a-zA-Z_]+)([\t\s]+)?(\**)([\t\s]+)?([0-9a-zA-Z_]+)))?\)\n{(\n[\s\t0-9a-zA-Z;=,.\->_\*\(\)+<>&)\[\]]*)*}/mgi;


	// SHOULD CHECK THE FUNCTION CONTENT MNUALLY (WITHOUT REGEX)

	var functionsLocation = data.match(functionsLocationRegex);

	console.log(".........................");
	console.log(functionsLocation);
	if (!functionsLocation)
		console.error(colors.error + "There is no function in the file." + colors.reset);
	else if (functionsLocation.length > 5)
		console.error(colors.error + functionsLocation.length + " functions in file!" + colors.reset);
	else
		console.log(colors.positive + functionsLocation.length + " functions in file." + colors.reset);
}

function	checkTrailingWhitespaces()
{
	var	trailingWhitespacesRegex = /[\t\s ]+$/mgi;
	var	trailingWhitespaces = data.match(trailingWhitespacesRegex);

	console.log(".........................");
	console.log(trailingWhitespaces);
}

function	checkEmptyLines()
{
	var	emptyLinesRegex = /\n\n/mgi;
	var	emptyLines = data.match(emptyLinesRegex);

	// After this, check if this empty line is in a good place
	console.log(".........................");
	console.log(emptyLines);
}

function	checkEndFileReturn()
{
	var	endFileReturnRegex = /$\Z/mgi;
	var	endFileReturn = data.match(endFileReturnRegex);

	console.log(".........................");
	if (!endFileReturn)
		console.error(colors.error + "Missing carriage return at end of file" + colors.reset);
}

function	parseFile(name, data)
{
	console.log(colors.discrete + "File : " + name + colors.reset);
	if (kubinette.visualMode)
		console.log(data);
	checkFunctions(name, data);
	checkTrailingWhitespaces();
	checkEndFileReturn();
	checkEmptyLines();
}

module.exports = parseFile;