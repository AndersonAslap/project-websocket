const socket = io("http://localhost:3000");

let idChatRoom = "";

function onLoad() {
    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get("name");
    const email = urlParams.get("email");
    const avatar = urlParams.get("avatar");

    document.querySelector(".user_logged").innerHTML += `
        <img
            class="avatar_user_logged"
            src=${avatar}
        />
        <strong id="user_logged">${name}</strong>
    `;

    socket.emit("start", {
        name, 
        email, 
        avatar,
    });

    socket.on("new_users", (user) => {
        const existInDiv = document.getElementById(`user_${user._id}`);

        if (!existInDiv) {
            addUser(user);
        }
    });

    socket.emit("get_users", (users) => {
        users.map(user => {
            if(user.email !== email) {
                addUser(user);
            }
        });
    });

    socket.on("message", (data) => {
        console.log("message", data);
    });
}

function addUser(user) {
    const usersList = document.getElementById("users_list");
    usersList.innerHTML += `
        <li
            class="user_name_list"
            id="user_${user._id}"
            idUser="${user._id}"
        >
            <img
                class="nav_avatar"
                src=${user.avatar}
            />
            ${user.name}
        </li>
    `;
}

document.getElementById("users_list").addEventListener("click", (event) => {
    if(event.target && event.target.matches("li.user_name_list")) {
        const idUser = event.target.getAttribute("idUser");

        socket.emit("start_chat", {idUser} , (data) => {
            idChatRoom = data.idChatRoom;
        });
    }
});

document.getElementById("user_message").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const message = event.target.value;
        event.target.value = "";

        const data = {
            message,
            idChatRoom
        }

        socket.emit("message", data);
    }
})

onLoad();