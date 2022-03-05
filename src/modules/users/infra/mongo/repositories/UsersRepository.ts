import { User } from "../../../../../schemas/User";
import { IUserUpdateDTO, IUserCreateDTO } from "../../../dtos/IUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";


class UsersRepository implements IUsersRepository {

    async findByEmail(email: string): Promise<any> {
        const user = await User.findOne({
            email
        }).exec();

        return user;
    }

    async findByIdAndUpdate({id, avatar, name, socket_id}: IUserUpdateDTO): Promise<any> {
        const user = await User.findByIdAndUpdate({
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
        const user = await User.create({
            email,
            socket_id,
            avatar,
            name
        });

        return user;
    }

    async findUsers() : Promise<any[]> {
        const users = await User.find();
        return users;
    }
    
}

export { UsersRepository };