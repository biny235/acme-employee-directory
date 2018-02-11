const express = require('express');
const app = express();
const db = require('./db');
const nunjucks = require('nunjucks');
nunjucks.configure({noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

db.sync()
    .then(()=> db.seed())
    
app.use('/', require('./routes'));

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`port: ${port}`)
})