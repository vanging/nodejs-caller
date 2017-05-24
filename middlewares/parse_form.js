const Formidable = require('formidable');
const config = require('../config');
const generate_request_id = require('../lib/generate_request_id');

module.exports = async function(ctx, next)
{
    const req = ctx.req;
    const form = new Formidable.IncomingForm();
    form.uploadDir = config.upload_dir;
    form.keepExtensions = true;
    form.encoding = 'utf8';
    form.parse(req, function(err, fields, files)
    {
        if(err)
        {
            console.log(err);
            ctx.body = JSON.parse
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
            console.log(files);

            const file = files[0];
            if( files.length > 1 )
            {
                ctx.body = JSON.stringify
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
                ctx.body = JSON.stringify
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
                ctx.body = JSON.stringify
                (
                    {
                        status: 'param_not_valid',
                        message: 'the field "from" and "to" must exist',
                    }
                );
                return;
            }

            ctx.request_id = generate_request_id();
            ctx.from = fields.from;
            ctx.to = fields.to;
            ctx.state.file = file;
            next();
        }
    });
};