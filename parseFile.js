/*
**	File Parser
*/

function	checkFunction(name, data, i, fileInfo)
{
	// This Regex still doesn't match functions as parameters
	// var isFunctionRegex = /^([\t\s]*)([0-9a-zA-Z_]+ )?([0-9a-zA-Z_]+)([\t\s]+)(\**)([\t\s]+)?([0-9a-zA-Z_]+)\(((([0-9a-zA-Z_]+ )?([0-9a-zA-Z_]+)([\t\s]+)?(\**)([\t\s]+)?([0-9a-zA-Z_]+)(?:, ))*(([0-9a-zA-Z_]+ )?([0-9a-zA-Z_]+)([\t\s]+)?(\**)([\t\s]+)?([0-9a-zA-Z_]+)))?\)[\t\s]*(?!;)(?:{)?/mgi;

		// STILL BUGGY
	var	isFunctionRegex = /^([\s]*[a-z_A-Z1-9\-_]+){1,4}[\*\t ]*[\t ]+[\*\t ]*[a-z_A-Z1-9\-_]+\(/mgi;

	// var argFunctionRegex = /[0-9a-zA-Z_]+[\t\s]*\*?\(\*?[0-9a-zA-Z_]+[\t\s]*\)\((([0-9a-zA-Z_]+)[\t\s]+(\**)([\t\s]*)([0-9a-zA-Z_]+),)*[\t\s]([0-9a-zA-Z_]+)([\t\s]+)(\**)([0-9a-zA-Z_]+)\)/mgi;

	var isFunction = data[i].match(isFunctionRegex);
	// Should check umcompleteFunctionPrototypeRegex FIRST!
	if (isFunction)
	{
		if (kubinette.detailedMode)
		{
			fileInfo.log(isFunction[0]);
		}
		data[i].isFunctionStart = 1;
		fileInfo.functionsCount++;
	}
	else
		data[i].isFunctionStart = 0;
}

function	checkTrailingWhitespaces(data, i, fileInfo)
{
	var	trailingWhitespacesRegex = /[\t\s ]+$/mgi;
	var	trailingWhitespaces = data[i].match(trailingWhitespacesRegex);

	if (trailingWhitespaces)
	{
		fileInfo.errorsCount++;
		fileInfo.log(colors.error + "Line " + i + ": Trailing whitespaces" + colors.reset);
	}
}

function	checkEmptyLines(data, i, fileInfo)
{
	var	emptyLineRegex = /^$/mgi;
	var	emptyLine = data[i].match(emptyLineRegex);

	// After this, check if this empty line is in a good place
	if (emptyLine)
	{
		data[i].isEmptyLine = true;
		if (i > 0 && data[i - 1].isEmptyLine)
		{
			fileInfo.errorsCount++;
			fileInfo.log(colors.error + "Line " + (i - 1) + ": Multiple empty lines." + colors.reset);
		}
	}
}

function	checkEndFileReturn(data, i, fileInfo)
{
	var	endFileReturnRegex = /^$/mgi;
	var	endFileReturn = data[i].match(endFileReturnRegex);

	if (!endFileReturn)
	{
		fileInfo.errorsCount++;
		fileInfo.log(colors.error + "Missing carriage return at end of file" + colors.reset);
	}
}

function	displayFunctionsCount(fileInfo, data)
{
	if (kubinette.detailedMode)
		console.log("-----------");
	if (fileInfo.errorsCount == 0 && fileInfo.functionsCount <= 5 && fileInfo.functionsCount > 0)
		process.stdout.write(colors.positive + "✔ " + colors.reset);
	else
		process.stdout.write(colors.error + "✘ " + colors.reset);
	console.log(colors.discrete + fileInfo.name + colors.reset);
	process.stdout.write(fileInfo.checkLog);
	if (!fileInfo.functionsCount)
		process.stdout.write(colors.error + "There is no function in the file.\n" + colors.reset);
	else if (fileInfo.functionsCount > 5)
		console.error(colors.error + fileInfo.functionsCount + " functions in file!" + colors.reset);
	else if (kubinette.detailedMode)
		console.log(colors.positive + fileInfo.functionsCount + " functions in file." + colors.reset);
}

function	parseFile(name, data)
{
	// if (kubinette.visualMode)
	var data = data.split('\n');
	var	fileInfo = new Array();
	fileInfo.name = name;
	fileInfo.functionsCount = 0;
	fileInfo.errorsCount = 0;
	fileInfo.checkLog = "";
	fileInfo.log = function (text)
	{
		this.checkLog += text + "\n";
	}

	for (var i in data)
	{
		if (i > 0 && !data[i - 1].isFunctionStart && !data[i - 1].isCompletePrototype)
			checkFunction(name, data, i, fileInfo);
		checkTrailingWhitespaces(data, i, fileInfo);
		checkEmptyLines(data, i, fileInfo);
	}
	checkEndFileReturn(data, i, fileInfo);
	displayFunctionsCount(fileInfo, data);
}

module.exports = parseFile;