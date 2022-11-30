'use strict';
import express from 'express';
import {create} from 'express-handlebars';
import * as path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 3000;

const app = express( );
const hbs = create({
  extname: '.hbs'
});

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

app.get('/', (req, res) => {
  res.render('index', {script: "main"});
});

app.get('/animations', (req, res) => {
  res.render('animation', {script: "animation/main"})
})

const onlisten = err => {
  if( err ) throw err;
  console.log('Server initialized, listening on port', port);
}

app.listen(port, onlisten );