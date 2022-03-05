import { injectable } from "tsyringe";
import { IUserCreateDTO } from "../dtos/IUserDTO";
import { UsersRepository } from "../infra/mongo/repositories/UsersRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {

    private usersRepository : IUsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async execute({ name, email, avatar, socket_id } : IUserCreateDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        

        if(userAlreadyExists) {
            const user = await this.usersRepository.findByIdAndUpdate({
                avatar, 
                id:userAlreadyExists._id, 
                name, 
                socket_id}
            );
            
            return user;
        } else {
            const user = await this.usersRepository.create({
                avatar,
                email,
                name,
                socket_id
            })

            return user;
        }
    }
}

export { CreateUserUseCase };