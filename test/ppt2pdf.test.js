const ppt2pdf = require('../lib/ppt2pdf');
const config = require('../config');
const path = require('path');
const fs = require('fs');
const ppt_file_list = fs.readdirSync(path.resolve(config.sample_dir.ppt)).map(function(e)
{
    return path.resolve(config.sample_dir.ppt, e);
});
console.log(ppt_file_list);

describe('the ppt2pdf command executor', function()
{
    describe('should transform the ppt to a pdf and put it in the right place', function()
    {
        ppt_file_list.forEach(function(e)
        {
            it(`when transforming ${e}`, function()
            {
                this.timeout(60000);
                return ppt2pdf(e, config.output_dir.pdf);
            });
        });
    });
});