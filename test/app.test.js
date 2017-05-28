const request = require('request');
const assert = require('assert');
const config = require('../config');
const fs = require('fs');
const path = require('path');

const ppt_file_list = fs.readdirSync(config.sample_dir.ppt).map(function(e)
{
    return path.resolve(config.sample_dir.ppt, e);
});

const pdf_file_list = fs.readdirSync(config.sample_dir.pdf).map(function(e)
{
    return path.resolve(config.sample_dir.pdf, e);
});

const post = function(form_data)
{
    return new Promise(function(resolve, reject)
    {
        request.post
        (
            {
                url: 'http://localhost:40001',
                formData: form_data
            },
            function(err, res, body)
            {
                if(err)
                {
                    console.log(err);
                    reject(err);
                }
                else
                {
                    try
                    {
                        body = JSON.parse(body);
                        resolve(body);
                    }
                    catch(e)
                    {
                        reject(e);
                    }
                }
            }
        );
    });
};

describe('param checker', function()
{
    it('should not allow the form with no params', async function()
    {
        const form_data = {};
        const result = await post(form_data);
        assert.notEqual(result.status, 'ok');
    });
    it('should not accept the form having only the file to transform', async function()
    {
        const form_data = {};
        form_data.file = fs.createReadStream(path.resolve(config.sample_dir.ppt, 'test.ppt'));
        const result = await post(form_data);
        assert.notEqual(result.status, 'ok');
    });
    it('should not accept the form with a file and a param:from', async function()
    {
        const form_data = {};
        form_data.from = 'ppt';
        form_data.file = fs.createReadStream(path.resolve(config.sample_dir.ppt, 'test.ppt'));
        const result = await post(form_data);
        assert.notEqual(result.status, 'ok');
    });
    it('should accept the form with a file and params:from and to', async function()
    {
        this.timeout(120000);
        const form_data = {};
        form_data.from = 'ppt';
        form_data.to = 'pdf';
        form_data.file = fs.createReadStream(path.resolve(config.sample_dir.ppt, 'test.ppt'));
        const result = await post(form_data);
        assert.equal(result.status, 'ok');
    });
});

describe('ppt2pdf', function()
{
    this.timeout(120000);
    ppt_file_list.forEach(function(e)
    {
        it(`test file : ${e}`, async function()
        {
            const form_data = {};
            form_data.from = 'ppt';
            form_data.to = 'pdf';
            form_data.file = fs.createReadStream(e);

            const result = await post(form_data);

            assert.equal(result.status, 'ok');
            console.log(result.message);
        });
    });
});

describe('ppt2img', function()
{
    this.timeout(120000);
    ppt_file_list.forEach(function(e)
    {
        it(`test file : ${e}`, async function()
        {
            const form_data = {};
            form_data.from = 'ppt';
            form_data.to = 'img';
            form_data.file = fs.createReadStream(e);

            const result = await post(form_data);

            assert.equal(result.status, 'ok');
            console.log(result.message);
        });
    });
});

describe('ppt2img', function()
{
    this.timeout(120000);
    pdf_file_list.forEach(function(e)
    {
        it(`test file : ${e}`, async function()
        {
            const form_data = {};
            form_data.from = 'pdf';
            form_data.to = 'img';
            form_data.file = fs.createReadStream(e);

            const result = await post(form_data);

            assert.equal(result.status, 'ok');
            console.log(result.message);
        });
    });
});