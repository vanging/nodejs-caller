const Formidable = require('formidable');
const config = require('../config');
const generate_request_id = require('../lib/generate_request_id');

module.exports = async function(ctx, next)
{
    try
    {
        const form_data = await check_form(ctx.req);
        ctx.state.request_id = generate_request_id();
        Object.assign(ctx.state, form_data);
        console.log(ctx.state);
        next();
    }
    catch(e)
    {
        ctx.body = JSON.stringify(e);
    }
};

function check_form(req)
{
    return new Promise(function(resolve, reject)
    {
        const form = new Formidable.IncomingForm();
        form.uploadDir = config.upload_dir;
        form.keepExtensions = true;
        form.encoding = 'utf8';
        form.parse(req, function(err, fields, files)
        {
            if(err)
            {
                console.log(err);
                reject
                (
                    {
                    status: 'form_parse_error',
                    message: err.message
                    }
                );
            }
            else
            {
                console.log(fields);

                const file = files.file;
                if( files.length > 1 )
                {
                    reject
                    (
                        {
                            status: 'one_file_one_time',
                            message: 'one request can only contains one files to transform',
                        }
                    );
                    return;
                }
                if( ! file )
                {
                    reject
                    (
                        {
                            status: 'file_field_not_found',
                            message: 'there seems have no file in the request',
                        }
                    );
                    return;
                }
                if( ! fields.from || ! fields.to )
                {
                    reject
                    (
                        {
                            status: 'param_not_valid',
                            message: 'the field "from" and "to" must exist',
                        }
                    );
                    return;
                }

                const form_data =
                    {
                        from: fields.from,
                        to: fields.to,
                        uploaded_file: file
                    };
                resolve(form_data);
            }
        });
    })
}