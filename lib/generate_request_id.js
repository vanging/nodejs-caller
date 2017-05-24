module.exports = function()
{
    let str = new Date().getTime().toString(36);
    while(str.length < 33)
    {
        str += (Math.random()*1e20).toString(36);
    }
    return str.substr(0, 32);
};