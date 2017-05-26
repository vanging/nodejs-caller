const pdf2img = require('../lib/pdf2img');
const config = require('../config');

module.exports = async function(ctx, next)
{
    if( ctx.state.from === 'pdf')
    {

    }
    else if(ctx.state.from === 'ppt' && ctx.state.to === 'img')
    {

    }
    next();
};