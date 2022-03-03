const socket = io("http://localhost:3000");

socket.on("chat_start", data => {
    console.log(data);
});