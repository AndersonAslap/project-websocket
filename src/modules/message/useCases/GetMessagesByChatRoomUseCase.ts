import { injectable } from "tsyringe";
import { MessageRepository } from "../infra/mongo/repositories/MessageRepository";
import { IMessageRepository } from "../repositories/IMessageRepository";

injectable()
class GetMessagesByChatRoomUseCase {

    private messageRepository : IMessageRepository;

    constructor() {
        this.messageRepository = new MessageRepository();
    }

    async execute(roomId: string) : Promise<any> {
        const messages = await this.messageRepository.findByChatRoom(roomId);
        return messages;
    }
}

export { GetMessagesByChatRoomUseCase };