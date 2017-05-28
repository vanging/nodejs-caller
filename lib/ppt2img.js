const ppt2pdf = require('./ppt2pdf');
const pdf2img = require('./pdf2img');

module.exports = async function(input_file)
{
    let result = await ppt2pdf(input_file);
    return await pdf2img(result.file_path);
};