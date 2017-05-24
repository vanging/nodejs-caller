const koa = require('koa');
const app = new koa();

app.use(require('./middlewares/parse_form'));

app.listen(40001);
console.log(`app listening at http://localhost:40001`);