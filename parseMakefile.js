/*
**	Makefile Parser
*/

function	parseMakefile()
{
	if (fs.existsSync('Makefile'))
	{
		console.log("We found a Makefile, trying to open it :");
		fs.readFile('Makefile', 'utf8', function (err, data)
		{
			if (err)
				return (console.log(err));
			console.log(data);
		});
	}
	else
		console.error(colors.error + "No Makefile in current directory." + colors.reset);
}

module.exports = parseMakefile;