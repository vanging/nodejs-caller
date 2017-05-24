const path = require('path');

const upload_dir = path.resolve('../upload');
const sample_dir = path.resolve('../sample');
const sample =
    {
        ppt: path.resolve(sample_dir, 'ppt'),
        pdf: path.resolve(sample_dir, 'pdf'),
    };
const output_dir = path.resolve('../output');
const output =
    {
        pdf: path.resolve(output_dir, 'pdf'),
        image: path.resolve(output_dir, 'image'),
    };

module.exports =
    {
        upload_dir,
        sample_dir: sample,
        output_dir: output,
    };