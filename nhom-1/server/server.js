require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

const port = process.env.PORT || 3000;

app.set('port',port);

app.get('/test',(req,res)=> {
    res.json({message: "test successful"});
});

const server = http.createServer(app);

const io = require('socket.io')(server);

require('./messenger/messenger-socket')(io);
require('./notification/notification-socket')(io,app);

const auth = require('./auth/auth');
const api = require('./api/api')(io);


app.use('/auth',auth);
app.use('/api',api);

server.listen(port,()=> console.log(`API running on localhost:${port}`));
