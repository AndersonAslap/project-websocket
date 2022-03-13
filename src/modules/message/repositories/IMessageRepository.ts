import { CreateMessageDTO } from "../dto/CreateMessageDTO";

interface IMessageRepository {
    create(data: CreateMessageDTO) : Promise<any>;
    findByChatRoom(roomId : string) : Promise<any>;
}

export { IMessageRepository };