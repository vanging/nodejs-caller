const child_process = require('child_process');

module.exports = function(input_file, output_path)
{
    return new Promise(function(resolve, reject)
    {
        const command =
            [
                'soffice',
                '--headless',
                '--convert-to',
                'pdf',
                '--outdir',
                output_path,
                `"${input_file}"`,
            ].join(' ');
        // console.log(command);
        child_process.exec(command, function(err, stdout, stderr)
        {
            if(err)
            {
                console.log(err);
                console.log(stderr);
                err.stderr = stderr;
                reject(err);
            }
            else
            {
                resolve(stdout);
            }
        })
    });
};