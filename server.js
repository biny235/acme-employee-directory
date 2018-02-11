const express = require('express');
const app = express();
const path= require('path')
const db = require('./db');
const nunjucks = require('nunjucks');
nunjucks.configure({noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
db.sync()
    .then(()=> db.seed())

app.use('/', require('./routes'));

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`port: ${port}`)
})