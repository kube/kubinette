/*
**	Makefile Parser
*/

function	parseMakefile()
{
	if (fs.existsSync('Makefile'))
	{
		console.log(colors.error + "Kubinette doesn't handle Makefiles yet." + colors.reset);
		console.log("Usage : kubinette [file1] [file2] ... [file]");
		fs.readFile('Makefile', 'utf8', function (err, data)
		{
			if (err)
				return (console.log(err));
			// console.log(data);

		});
	}
	else
		console.error(colors.error + "No Makefile in current directory." + colors.reset);
}

module.exports = parseMakefile;