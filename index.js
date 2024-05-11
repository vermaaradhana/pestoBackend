var express = require('express');
var app     = express();
const http = require("http");
var cors = require('cors');
const bodyParser = require('body-parser');
// const db=require('./config/dbConfig');
const {engine} = require('express-handlebars');

app.use(cors());

const port=4000;
//create server with listeners
const server = http.createServer(app);

// View engine setup
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    limit: 52428800,
    extended: true,
    type: "application/x-www-form-urlencoded"
})); 
// parse application/json
app.use(bodyParser.json({
    limit: 52428800,
    type: "application/json"
}));

//global routes settings
app.use(require("./routes/index"));

app.get('/', function(err,req, res) {
    if(err)
  throw Error("An unhandled error happens!");

  res.status(500).send({msg:"Initial response"})
});

app.get('**',function(err,req,res){
if(err)
throw Error("Page not found",err)
res.status(404).send({msg:"Page not found"});
})

// server error listener
const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//server listening listener
const onListening = () => {
    const addr = server.address();
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    console.log("Listening on " + bind);
};

server.on("error", onError);
server.on("listening", onListening);

//start server
server.listen(port);