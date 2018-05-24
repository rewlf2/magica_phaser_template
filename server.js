const os = require('os');
const log = require('winston'); // error, warn, info, verbose, debug, silly

// Setup the environment.
const env = process.env.NODE_ENV;
const port = process.env.PORT;
const host = `${os.hostname()}:${port}`;
log.remove(log.transports.Console);
log.add(log.transports.Console, {colorize: true, timestamp: true});

// Game server code goes here....

const mysql = require('mysql2');
var mysql_outputs = {};

function getMysqlCon() {
	con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "123456",
		database: "magica"
	});
	return con;
}

function onMysqlTest() {
	console.log("MySQL test started");
	const con = getMysqlCon();
	mysql_outputs = {username: "a", password: "b"};

	/*
	con.connect(function(err) {
		if (err) throw err;
		else {
			console.log("Connected!");
		
			// execute will internally call prepare and query
			con.execute(
				'SELECT username, password FROM `magica_user` WHERE `uid` = ?',
				[21],
				function(err, results, fields) {
					// console.log(fields); // fields contains extra meta data about results, if available
					// results.forEach(testFunction);
					// If you execute same statement again, it will be picked form a LRU cache
					// which will save query preparation time and give better performance
					mysql_outputs = {username: results[0].username, password: results[0].password};
					io.emit('mysql_change_text', mysql_outputs);
				}
			);
			con.end(function(err) {
				console.log("Closed connection");
			});
		}
	});
	*/
	
	con.connect(function(err) {
		if (err) throw err;
		else {
			console.log("Connected!");
		
			// execute will internally call prepare and query
			con.execute(
				'SELECT NOW() as time',
				[],
				function(err, results, fields) {
					mysql_outputs = {username: results[0].time, password: '0'};
					io.emit('mysql_change_text', mysql_outputs);

					/*
					// Anoth example on prepared statement
					'SELECT username, password FROM `magica_user` WHERE `uid` = ?',
					[21],
					function(err, results, fields) {
						// console.log(fields); // fields contains extra meta data about results, if available
						// results.forEach(testFunction);
						// If you execute same statement again, it will be picked form a LRU cache
						// which will save query preparation time and give better performance
						mysql_outputs = {username: results[0].username, password: results[0].password};
						io.emit('mysql_change_text', mysql_outputs);
					}
					*/

				}
			);
			con.end(function(err) {
				console.log("Closed connection");
			});
		}
	});
}

 // io connection 

if (env == "production") {

	var express = require('express');

	var app = express();
	// Allow CORS for local debug
	app.use(function(req, res) {
	res.header('Access-Control-Allow-Origin', 'example.com');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	});

	var serv = require('http').Server(app);
	var io = require('socket.io')(serv,{origins: "http://localhost:*"});
	
	app.get('/',function(req, res) {
		res.sendFile(__dirname + '/dist/index.html');
	});
	// /client changes into /src
	app.use('/ajax',express.static(__dirname + '/src'));

	serv.listen(port, function(){
		console.log("Server is listening on port " + port);
	});
}

io.sockets.on('connection', function(socket){
	console.log("socket connected"); 

	socket.on('mysql_test', onMysqlTest);
});

// Log that the game server has started.
log.info(`Game server started at ${host} [${env}].`);