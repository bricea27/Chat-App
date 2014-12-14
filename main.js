//Client File
var client = new WebSocket("ws://andrew.princesspeach.nyc:3000");

client.addEventListener("open", function() {
  console.log('connected');

  //HTML elements
  var body = document.querySelector("body");
  var ul = document.querySelector("ul");
  var userName = document.getElementById("username");
  var userInput = document.getElementById("userinput");
  var button = document.getElementById("button");
  var input = document.getElementById("input");
  var display = document.getElementById("display");

  button.addEventListener("click", function(){

    //create messageObject with name and message
    var messageObject = {name: "Anonymous:", msg: input.value};
    //take messageObject, stringify and send to server

    //will only send something if the inputs actually have text
    if ((userName.value.trim() != "") && (input.value.trim() != "")) {
      messageObject.name = userName.value + ": ";
      //resets input boxes
      userInput.style.display = "none";
      userName.style.display = "none";
      input.value = "";
      client.send(JSON.stringify(messageObject));
    }
  });//end button click function

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

    var nameSpan = document.createElement("span");
    var msgSpan = document.createElement("span");
    nameSpan.innerText = newMessage.name;
    msgSpan.innerText = newMessage.msg;

    li.appendChild(nameSpan);
    li.appendChild(msgSpan);
    //this will put the list element at the top of the list
    ul.appendChild(li);

    display.scrollTop = display.scrollHeight;

  });


});//end open connection
