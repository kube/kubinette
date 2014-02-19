/*
**	Check Arguments
*/

var validArgs		= ["--help", "--version", "--visual", "--detailed", "-d", "-v", "-h"];
var checkedArgs		= new Array();
var argsFunctions	= new Array();


// Functions

argsFunctions["--help"] = function()
{
	console.log("	Usage : kubinette [file1] [file2] ... [file]");
	process.exit();
};

argsFunctions["--visual"] = function()
{
	kubinette.visualMode = 1;
};

argsFunctions["--detailed"] = function()
{
	kubinette.detailedMode = 1;
};


// Aliases
argsFunctions["-d"] = argsFunctions["--detailed"];
argsFunctions["-v"] = argsFunctions["--visual"];
argsFunctions["-h"] = argsFunctions["--help"]; 

function			isArgument(argument)
{
	if (argument.match(/^-/g))
	{
		if (!checkedArgs[argument])
		{
			if (validArgs.indexOf(argument) > -1)
				argsFunctions[argument]();
			else
			{
				console.error("Invalid argument " + argument);
				process.exit();
			}
		}
		checkedArgs[argument] = 1;
		return (1);
	}
	else
		return (0);
}

module.exports = isArgument;