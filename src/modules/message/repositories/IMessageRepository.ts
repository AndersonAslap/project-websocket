import { CreateMessageDTO } from "../dto/CreateMessageDTO";

interface IMessageRepository {
    create(data: CreateMessageDTO) : Promise<any>;
}

export { IMessageRepository };