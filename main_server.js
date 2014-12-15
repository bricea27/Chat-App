//Server File
var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 3000});

var storedMessages = [];
var storedClients = [];

var clientCounter = 0;

console.log("listening on port 3000 (press CTRL+C to quit)");

server.on("connection", function(connection){
  clientCounter++;
  console.log(clientCounter);
  console.log("Client Connected");


  connection.userId = "user_" + clientCounter;

  console.log(connection.userId);

  //add new connection to list of clients
  storedClients.push(connection);

  //for each new conenction, send them previously stored messages
  storedMessages.forEach(function(each){
    connection.send(each);
  });

  //listen for incoming messages
  connection.on("message", function(message){
    console.log(message);
    //add message to stored messages array
    storedMessages.push(message);

    //send message to each client
    storedClients.forEach(function(each){
      each.send(message);
    });


  });//end message

  //if client closes connection, reset counter to 0
  connection.on("close", function(){
    console.log(connection.userId + " Disconnected");

    storedClients.forEach(function(each){
      if (each === connection) {
        var index = storedClients.indexOf(each);
        storedClients.splice(index, 1);
      }
    });

  });//end on close


});//end connection
