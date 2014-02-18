/*
**	File Parser
*/

function	checkFunction(name, data, i, fileInfo)
{
	// This Regex still doesn't match functions as parameters
	var isFunctionRegex = /^([\t\s]*)([0-9a-zA-Z_]+ )?([0-9a-zA-Z_]+)([\t\s]+)(\**)([\t\s]+)?([0-9a-zA-Z_]+)\(((([0-9a-zA-Z_]+ )?([0-9a-zA-Z_]+)([\t\s]+)?(\**)([\t\s]+)?([0-9a-zA-Z_]+)(?:, ))*(([0-9a-zA-Z_]+ )?([0-9a-zA-Z_]+)([\t\s]+)?(\**)([\t\s]+)?([0-9a-zA-Z_]+)))?\)[\t\s]*(?!;)(?:{)?$/mgi;

	var isFunction = data[i].match(isFunctionRegex);
	// Should check umcompleteFunctionPrototypeRegex FIRST!
	if (isFunction)
	{
		console.log(data[i]);
		data[i].isFunctionStart = 1;
		fileInfo.functionsCount++;
	}
	else
		data[i].isFunctionStart = 0;
}

function	checkTrailingWhitespaces(data, i)
{
	var	trailingWhitespacesRegex = /[\t\s ]+$/mgi;
	var	trailingWhitespaces = data[i].match(trailingWhitespacesRegex);

	if (trailingWhitespaces)
		console.log(colors.error + "Line " + i + ": Trailing whitespaces" + colors.reset)
}

function	checkEmptyLines(data, i)
{
	var	emptyLineRegex = /^$/mgi;
	var	emptyLine = data[i].match(emptyLineRegex);

	// After this, check if this empty line is in a good place
	if (emptyLine)
	{
		data[i].isEmptyLine = true;
		if (i > 0 && data[i - 1].isEmptyLine)
			console.log(colors.error + "Line " + (i - 1) + ": Multiple empty lines." + colors.reset)
	}
}

function	checkEndFileReturn(data, i)
{
	var	endFileReturnRegex = /^$/mgi;
	var	endFileReturn = data[i].match(endFileReturnRegex);

	if (!endFileReturn)
		console.error(colors.error + "Missing carriage return at end of file" + colors.reset);
}

function	displayFunctionsCount(fileInfo)
{
	if (!fileInfo.functionsCount)
		console.error(colors.error + "There is no function in the file." + colors.reset);
	else if (fileInfo.functionsCount > 5)
		console.error(colors.error + fileInfo.functionsCount + " functions in file!" + colors.reset);
	else
		console.log(colors.positive + fileInfo.functionsCount + " functions in file." + colors.reset);
}


function	parseFile(name, data)
{
	// if (kubinette.visualMode)
	console.log(colors.discrete + "File : " + name + colors.reset);
	var data = data.split('\n');
	var	fileInfo = new Array();
	fileInfo.functionsCount = 0;

	for (var i in data)
	{
		if (i > 0 && !data[i - 1].isFunctionStart && !data[i - 1].isCompletePrototype)
			checkFunction(name, data, i, fileInfo);
		checkTrailingWhitespaces(data, i);
		checkEmptyLines(data, i);
	}
	checkEndFileReturn(data, i);
	displayFunctionsCount(fileInfo);
}

module.exports = parseFile;