import { User } from "../../../../../schemas/User";
import { IUserUpdateDTO, IUserCreateDTO } from "../../../dtos/IUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";


class UsersRepository implements IUsersRepository {

    private repository = User;

    async findByEmail(email: string): Promise<any> {
        const user = await this.repository.findOne({
            email
        }).exec();

        return user;
    }

    async findByIdAndUpdate({id, avatar, name, socket_id}: IUserUpdateDTO): Promise<any> {
        const user = await this.repository.findByIdAndUpdate({
            _id: id
        },
        {
            $set: {socket_id, avatar, name}
        },{
            new: true,
        });

        return user;
    }

    async create({avatar, email, name, socket_id}: IUserCreateDTO): Promise<any> {
        const user = await this.repository.create({
            email,
            socket_id,
            avatar,
            name
        });

        return user;
    }

    async findUsers() : Promise<any[]> {
        const users = await this.repository.find();

        return users;
    }

    async findBySocketId(socket_id: string) : Promise<any> {
        const user = await this.repository.findOne({
            socket_id
        });

        return user;
    }
    
}

export { UsersRepository };