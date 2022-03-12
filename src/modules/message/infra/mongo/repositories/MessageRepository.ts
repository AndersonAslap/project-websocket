import { Message } from "../../../../../schemas/Message";
import { CreateMessageDTO } from "../../../dto/CreateMessageDTO";
import { IMessageRepository } from "../../../repositories/IMessageRepository";

class MessageRepository implements IMessageRepository {
    private repository = Message;

    async create({to, text, roomId}: CreateMessageDTO): Promise<any> {

        const message = this.repository.create({
            to,
            text,
            roomId
        });
        
        return message;
    }

}

export { MessageRepository };