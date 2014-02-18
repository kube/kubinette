/*
**	Makefile Parser
*/

function	parseMakefile()
{
	if (fs.existsSync('Makefile'))
	{
		console.log(colors.error + "Experimental Makefile Parser" + colors.reset);
		fs.readFile('Makefile', 'utf8', function (err, data)
		{
			if (err)
				return (console.log(err));
			var	getMakefileSourcesRegex = /([\t]*([a-z]+\/)*[a-z_.]*[\t]*\\\n)+/mgi;
			var	sourcesFiles = data.match(getMakefileSourcesRegex);
			sourcesFiles = sourcesFiles.join('\\').replace(/[\t\s\n ]*/mgi, "").split(/\\+/);
			for (var i in sourcesFiles)
				kubinette.loadFile(sourcesFiles[i]);
		});
	}
	else
		console.error(colors.error + "No Makefile in current directory." + colors.reset);
}

module.exports = parseMakefile;