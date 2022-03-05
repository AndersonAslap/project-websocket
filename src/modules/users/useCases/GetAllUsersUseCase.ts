import { injectable } from "tsyringe";
import { User } from "../../../schemas/User";
import { UsersRepository } from "../infra/mongo/repositories/UsersRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
class GetAllUsersUseCase {

    private usersRepository : IUsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async execute() : Promise<any[]> {
        const users = await this.usersRepository.findUsers();
        return users;
    }
}

export { GetAllUsersUseCase };