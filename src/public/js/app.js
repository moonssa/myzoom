
const socket = io();
const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;
let roomName, nickName;

function addMessage(msg) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", value, roomName, ()=> {
      addMessage(`You: ${value}`);
  });
  input.value = "";
}


function showRoom() {
  form.hidden = true;
  room.hidden = false;
  h3 = room.querySelector("h3");
  h3.innerText = `Room :  ${roomName}`;
  span = room.querySelector("span");
  span.innerText = `My nickname:  ${nickName}`;
  const msgForm = room.querySelector("#msg");
  
  msgForm.addEventListener("submit", handleMessageSubmit);
  
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const inputRoomname = form.querySelector("#roomname");
  const inputNickname = form.querySelector("#nickname");
  
  roomName = inputRoomname.value;
  nickName = inputNickname.value;
  
  //socket.emit("enter_room", inputRoomname.value, inputNickname.value, showRoom);
  socket.emit("enter_room", roomName, nickName, showRoom);
  inputRoomname.value = "";
  inputNickname.value = ""
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
  h3 = room.querySelector("h3");
  h3.innerText = `Room :  ${roomName} (${newCount})`;
  addMessage(`${user} arrived!`);
});

socket.on("bye", (user, newCount) => {
  h3 = room.querySelector("h3");
  h3.innerText = `Room :  ${roomName} (${newCount})`;
  addMessage(`${user} left ㅠㅠ`);
});

socket.on("new_message", addMessage);

socket.on("roomState_change", (rooms)=> {
  const roomList = document.querySelector("#roomList ul");
  roomList.innerHTML="";
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});




