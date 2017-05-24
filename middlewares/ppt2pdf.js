module.exports = async function(ctx, next)
{
    if( ctx.state.from === 'ppt')
    {

    }
    else
    {
        next();
    }
};