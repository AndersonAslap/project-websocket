import { injectable } from "tsyringe";
import { UsersRepository } from "../infra/mongo/repositories/UsersRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
class GetUserBySocketIdUseCase {
    private usersRepository : IUsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async execute(socket_id: string) : Promise<any> {
        const user = await this.usersRepository.findBySocketId(socket_id);
        console.log(socket_id)
        return user;
    }
}

export { GetUserBySocketIdUseCase };