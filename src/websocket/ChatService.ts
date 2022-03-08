import { container } from "tsyringe";
import { io } from "../http";
import { CreateUserUseCase } from "../modules/users/useCases/CreateUserUseCase";
import { GetAllUsersUseCase } from "../modules/users/useCases/GetAllUsersUseCase";

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

        console.log(users);

        callback(users);
    });
});