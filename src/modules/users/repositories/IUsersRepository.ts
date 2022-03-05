import { IUserCreateDTO, IUserUpdateDTO } from "../dtos/IUserDTO";

interface IUsersRepository {
    findByEmail(email: string) : Promise<any>;
    findByIdAndUpdate(data: IUserUpdateDTO) : Promise<any>;
    create(data: IUserCreateDTO) : Promise<any>;
}

export { IUsersRepository };