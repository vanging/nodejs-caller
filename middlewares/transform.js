const config = require('../config');
const generate_request_id = require('../lib/generate_request_id');
const check_form = require('../lib/check_form');
const ppt2pdf = require('../lib/ppt2pdf');
const ppt2img = require('../lib/ppt2img');
const pdf2img = require('../lib/pdf2img');

module.exports = async function(ctx, next)
{
    try
    {
        const form_data = await check_form(ctx.req);

        if(form_data.from === 'ppt' && form_data.to === 'pdf')
        {
            const transform_result = await ppt2pdf(form_data.uploaded_file);
            ctx.body = JSON.stringify
            (
                {
                    status: 'ok',
                    message: transform_result
                }
            );
        }
        if(form_data.from === 'ppt' && form_data.to === 'img')
        {
            const transform_result = await ppt2img(form_data.uploaded_file);
            ctx.body = JSON.stringify
            (
                {
                    status: 'ok',
                    message: transform_result
                }
            );
        }
        if(form_data.from === 'pdf' && form_data.to === 'img')
        {
            const transform_result = await pdf2img(form_data.uploaded_file);
            ctx.body = JSON.stringify
            (
                {
                    status: 'ok',
                    message: transform_result
                }
            );
        }
        next();
    }
    catch(e)
    {
        ctx.body = JSON.stringify(e);
    }
};