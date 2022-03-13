import { container } from "tsyringe";
import { io } from "../http";
import { CreateChatRoomUseCase } from "../modules/chatRoom/useCases/CreateChatRoomUseCase";
import { GetChatRoomByUsers } from "../modules/chatRoom/useCases/GetChatRoomByUsersUseCase";
import { CreateMessageUseCase } from "../modules/message/useCases/CreateMessageUseCase";
import { GetMessagesByChatRoomUseCase } from "../modules/message/useCases/GetMessagesByChatRoomUseCase";
import { CreateUserUseCase } from "../modules/users/useCases/CreateUserUseCase";
import { GetAllUsersUseCase } from "../modules/users/useCases/GetAllUsersUseCase";
import { GetUserBySocketIdUseCase } from "../modules/users/useCases/GetUserBySocketIdUseCase";

io.on("connect", (socket) => {
    socket.on("start", async (data) => {
        const { email, avatar, name } = data;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        
        const user = await createUserUseCase.execute({ email, avatar, name, socket_id: socket.id });
           
        socket.broadcast.emit("new_users", user);
    });

    socket.on("get_users", async (callback) => {
        const getAllUsersUseCase = container.resolve(GetAllUsersUseCase);
        const users = await getAllUsersUseCase.execute();

        callback(users);
    });

    socket.on("start_chat", async (data, callback) => {
        const createChatRoomUseCase = container.resolve(CreateChatRoomUseCase);
        const getUserBySocketIdUseCase = container.resolve(GetUserBySocketIdUseCase);
        const getChatRoomByUsers = container.resolve(GetChatRoomByUsers);
        const getMessagesByChatRoomUseCase = container.resolve(GetMessagesByChatRoomUseCase);

        const userLogged = await getUserBySocketIdUseCase.execute(socket.id);
        
        let room = await getChatRoomByUsers.execute([data.idUser, userLogged._id]);
        
        if (!room) {
            room = await createChatRoomUseCase.execute([data.idUser, userLogged._id]);
        }

        socket.join(room.idChatRoom);

        const messages = await getMessagesByChatRoomUseCase.execute(room.idChatRoom);
    
        callback({room, messages});
    });

    socket.on("message", async (data) => {
        const getUserBySocketIdUseCase = container.resolve(GetUserBySocketIdUseCase);
        const user = await getUserBySocketIdUseCase.execute(socket.id);
        
        const createMessageUseCase = container.resolve(CreateMessageUseCase);

        const message = await createMessageUseCase.execute({
            to: user._id,
            text: data.message,
            roomId: data.idChatRoom
        });

        io.to(data.idChatRoom).emit("message", {
            message,
            user
        });
    });
});