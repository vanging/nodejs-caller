let generate_request_id = require('../lib/generate_request_id');
let assert = require('assert');

describe('generate_request_id should generate the unique id', function()
{
    it('the id should be 32 chars long', function()
    {
        assert.equal(32, generate_request_id().length);
    })
});