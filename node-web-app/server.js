import 'dotenv/config';
import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import logger from 'morgan';

import config from 'config';
import router from 'src/router';

const PORT = config.PORT || 3003;
const ENV = config.APP_ENV || 'development';

const cors = require('cors');
const app = express();

app.use(logger(ENV));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// enable CORS
app.use(cors());

const allowlist = ['http://localhost', 'http://api.dockernodewebapp.webtestdev.site']
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.options('*', cors());

router(app);

var server = http.createServer(app).listen(PORT, function(){
  console.log("DockerNodeWebApp - API: " + PORT);
});