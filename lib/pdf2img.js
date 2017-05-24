const child_process = require('child_process');
const path = require('path');

module.exports = function(input_file, output_path)
{
    output_path += path.sep + 'page.jpg';
    return new Promise(function(resolve, reject)
    {
        const command =
            [
                'convert',
                '-density',
                '200',
                '-verbose',
                `"${input_file}"`,
                output_path,
            ].join(' ');
        console.log(command);
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