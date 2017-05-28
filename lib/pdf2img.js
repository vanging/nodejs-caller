const child_process = require('child_process');
const path = require('path');
const config = require('../config');
const fs = require('fs');
const generate_request_id = require('./generate_request_id');
let output_path = config.output_dir.image;

module.exports = function(input_file)
{
    const request_id = generate_request_id();
    const image_dir = path.resolve(output_path, request_id);
    fs.mkdirSync(image_dir);
    const file_path = image_dir + path.sep + 'page.jpg';
    return new Promise(function(resolve, reject)
    {
        const command =
            [
                'convert',
                '-density',
                '50',
                '-verbose',
                `"${input_file}"`,
                file_path,
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
                const result =
                    {
                        base_url: config.base_url.image + '/' + request_id,
                        list: fs.readdirSync(image_dir),
                    };
                resolve(result);
            }
        });
    });
};