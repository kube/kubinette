/*
**	File Parser
*/

var validArgs		= ["--help", "--version", "--visual"];
var checkedArgs		= new Array();
var argsFunctions	= new Array();

argsFunctions["--help"] = function()
{
	console.log("	Usage : kubinette [file1] [file2] ... [file]");
	process.exit();
};

argsFunctions["--visual"] = function()
{
	console.log("Enable Visual Mode");
	kubinette.visualMode = 1;
};

function			isArgument(argument)
{
	if (argument.match(/^--/g))
	{
		if (!checkedArgs[argument])
		{
			if (validArgs.indexOf(argument) > -1)
				argsFunctions[argument]();
			else
				console.error("Invalid argument " + argument);
		}
		checkedArgs[argument] = 1;
		return (1);
	}
	else
		return (0);
}

module.exports = isArgument;