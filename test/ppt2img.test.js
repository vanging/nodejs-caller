const fs = require('fs');
const config = require('../config');
const path = require('path');
const ppt2img = require('../lib/ppt2img');
const file_list = fs.readdirSync(config.sample_dir.ppt).map(function(e)
{
    return path.resolve(config.sample_dir.ppt, e);
});
console.log(file_list);

describe('#ppt2img()', function()
{
    file_list.forEach(function(e)
    {
        it(`input file :  ${e}`, function()
        {
            this.timeout(120000);
            return ppt2img(e);
        })
    });
});

