const ppt2pdf = require('../lib/ppt2pdf');
const config = require('../config');
const path = require('path');

module.exports = async function(ctx, next)
{
    if( ctx.state.from === 'ppt' )
    {
        try
        {
            const result = await ppt2pdf(ctx.state.uploaded_file.path, config.output_dir.pdf);
            ctx.state.generated_pdf = result.generated_pdf;
        }
        catch(e)
        {
            console.log(e);
            ctx.body = JSON.stringify
            (
                {
                    status: 'ppt_to_pdf_failed',
                    message: e
                }
            );
            return;
        }
    }
    if( ctx.state.from === 'pdf' )
    {
        ctx.state.generated_pdf = ctx.state.file.path;
    }
    next();
};