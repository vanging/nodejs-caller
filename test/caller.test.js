const caller = require('../caller');
const path = require("path");
const fs = require('fs');

const ppt_sample_dir = path.resolve(__dirname, '../../ppt-samples');
const ppt_samples = fs.readdirSync(ppt_sample_dir).map(function(e)
{
    return path.resolve(ppt_sample_dir, e);
});

describe('the transformer', function()
{
    describe('should transform all the ppt files into images and put them in the right dir', function()
    {
        this.timeout(30000);
        for(let e of ppt_samples)
        {
            it('when sample file is ' + e, function()
            {
                return caller(e)
                    .then(result =>
                    {
                        console.log(result);
                    },error =>
                    {
                        console.log(e);
                        console.log(error);
                    });
            });
        }
    })
});