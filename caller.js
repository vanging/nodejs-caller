const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const generate_request_id = require('./generate_request_id');
const env = process.env.NODE_ENV;
let env_sep;
if(env === 'development')
{
    env_sep = ';'
}
else if(env === 'production')
{
    env_sep = ':'
}
else
{
    throw new Error('NODE_ENV is not development or production');
}

const main_class_path= path.resolve(__dirname, '../java-transformer/out/production/java-transformer');
const poi_root = path.resolve(__dirname, '../java-transformer/lib/poi');
const poi_lib_root = path.resolve(__dirname, '../java-transformer/lib/poi/lib');
const ooxml_lib_root = path.resolve(__dirname, '../java-transformer/lib/poi/ooxml-lib');
const command =
    'java ' +
    '-classpath ' +
    '"' +
    main_class_path +
    env_sep +
    path.join(poi_root, 'poi-3.15.jar') +
    env_sep +
    path.join(poi_root, 'poi-ooxml-3.15.jar') +
    env_sep +
    path.join(poi_root, 'poi-excelant-3.15.jar') +
    env_sep +
    path.join(poi_root, 'poi-scratchpad-3.15.jar') +
    env_sep +
    path.join(poi_root, 'poi-ooxml-schemas-3.15.jar') +
    env_sep +
    path.join(poi_lib_root, 'junit-4.12.jar') +
    env_sep +
    path.join(poi_lib_root, 'log4j-1.2.17.jar') +
    env_sep +
    path.join(poi_lib_root, 'commons-codec-1.10.jar') +
    env_sep +
    path.join(poi_lib_root, 'commons-logging-1.2.jar') +
    env_sep +
    path.join(poi_lib_root, 'commons-collections4-4.1.jar') +
    env_sep +
    path.join(ooxml_lib_root, 'curvesapi-1.04.jar') +
    env_sep +
    path.join(ooxml_lib_root, 'xmlbeans-2.6.0.jar') +
    '"' +
    ' ' +
    'Main' +
    ' ';

module.exports = function(ppt_file_path)
{
    return new Promise(function(resolve,reject)
    {
        if(!ppt_file_path)
        {
            reject('no ppt file path');
            return;
        }
        const request_id = generate_request_id();
        const image_file_path = path.resolve(__dirname, '../output-images', request_id);
        try
        {
            fs.mkdirSync(image_file_path);
        }
        catch(e)
        {
            reject(e);
            return;
        }
        let final_command = command;
        final_command += `"${ppt_file_path}"`;
        final_command += ' ';
        final_command += `"${image_file_path}"`;
        const options =
            {

            };
        const java_process = child_process.exec(final_command,options,function(err,stdout,stderr)
        {
            if(err)
            {
                err.stderr = stderr;
                reject(err);
            }
            else
            {
                let result =
                    {
                        image_file_path,
                        stdout
                    };
                result.image_file_list = fs.readdirSync(image_file_path);
                resolve(result);
            }
        });
    });
};