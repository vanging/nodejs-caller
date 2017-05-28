const pdf2img = require('../lib/pdf2img');
const config = require('../config');
const path = require('path');
const fs = require('fs');
const ppt_file_list = fs.readdirSync(path.resolve(config.output_dir.pdf)).map(function(e)
{
    return path.resolve(config.output_dir.pdf, e);
});
console.log(ppt_file_list);

describe('the pdf2img command executor', function()
{
    describe('should transform the pdf to images and put it in the right place', function()
    {
        ppt_file_list.forEach(function(e)
        {
            it(`when transforming ${e}`, function()
            {
                this.timeout(60000);
                return pdf2img(e);
            });
        });
    });
});