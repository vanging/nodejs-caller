const child_process = require('child_process');
const path = require('path');
const config = require('../config');
const output_path = config.output_dir.pdf;

module.exports = function(input_file)
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
                input_file =
                    input_file
                    .split(path.sep)
                    .pop()
                    .split('.');
                input_file.pop();
                const pdf_name = input_file.join('.') + '.pdf';
                resolve
                (
                    {
                        file_path: path.resolve(output_path, pdf_name),
                        file_name: pdf_name,
                        url: config.base_url.pdf + '/' + pdf_name,
                        message: stdout
                    }
                );
            }
        })
    });
};