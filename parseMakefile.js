/*
**	Makefile Parser
*/

var parseMakefile = function(callback)
{
	//	Should Check if Makefile exists FIRST !
	var	getFilesRegex = /([a-z_]+\/)*[a-z_]+\.c/gi;
	var	child = exec("make -Bn", function (error, stdout, stderr)
	{
		var sourcesFiles = stdout.match(getFilesRegex);
		if (error !== null)
			console.log(colors.error + "ERROR: Cannot find a Makefile." + colors.reset);
		for (var i in sourcesFiles)
			kubinette.loadFile(sourcesFiles[i]);
	});
}

module.exports = parseMakefile;