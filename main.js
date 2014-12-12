//Client File
var client = new WebSocket("ws://andrew.princesspeach.nyc:3000");

client.addEventListener("open", function() {
  console.log('connected');

  //HTML elements
  var body = document.querySelector("body");
  var ul = document.querySelector("ul");
  var button = document.getElementById("button");

  button.addEventListener("click", function(){
    var input = document.getElementById("input");
    //create messageObject with name and message
    var userName = document.getElementById("username");
    var userInput = document.getElementById("userinput");

    var messageObject = {name: "Anonymous:", msg: input.value};
    //take messageObject, stringify and send to server

    if (userName.value.trim() != "") {
      messageObject.name = userName.value + ":";
    }

    //will only send something if the input actually has text
    if (input.value.trim() != "") {
      client.send(JSON.stringify(messageObject));
    }

    //resets input box
    input.value = "";
    userInput.style.display = "none";
    userName.style.display = "none";
  })

  // on pressing enter
  input.addEventListener("keypress", function(){
    if(event.keyCode === 13){
      button.click();
    }
  });

  //listens for incoming messages
  client.addEventListener("message", function(message) {
    //recieves message from server and parses the data
    var newMessage = JSON.parse(message.data);

    console.log(newMessage);

    var ul = document.querySelector("ul");
    var li = document.createElement("li");

    li.innerText = newMessage.name + " " + newMessage.msg;
    //this will put the list element at the top of the list
    ul.insertBefore(li, ul.firstChild);
  });


});//end open connection
