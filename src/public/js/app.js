const socket = io();
const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;
let roomName;

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
  socket.emit("new_message", value, roomName, addMessage(`You: ${value}`));
  input.value = "";
}
function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#name input");
    socket.emit("nickname", input.value);
  }

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  h3 = room.querySelector("h3");
  h3.innerText = `Room :  ${roomName}`;
  const msgForm = room.querySelector("#msg");
  const nickForm = room.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nickForm.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user} arrived!`);
});

socket.on("bye", (user) => {
  addMessage(`${user} left ㅠㅠ`);
});

socket.on("new_message", addMessage);



