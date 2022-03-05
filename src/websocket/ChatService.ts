import { container } from "tsyringe";
import { io } from "../http";
import { CreateUserUseCase } from "../modules/users/useCases/CreateUserUseCase";

io.on("connect", (socket) => {
    socket.on("start", async (data) => {
        const { email, avatar, name } = data;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        const user = await createUserUseCase.execute({ email, avatar, name, socket_id: socket.id });
        console.log(user);
    });
});