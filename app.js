const express = require('express');
const app = express();
const routes = require('./routes.js');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;


//express.static sets static routs, download not run
app.use(express.static('./public/'));
//app.use will call the function attached to it

//bodyParser allows the body to be read
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/movies', routes);

app.listen(port, function () {
    console.log('Server listening on port 3000');
});

// entry point to server, first file to run

//express listens for request then responds

//middleware steps through requests to verify it
