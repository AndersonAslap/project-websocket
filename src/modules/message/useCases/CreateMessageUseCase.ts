import { injectable } from "tsyringe";
import { CreateMessageDTO } from "../dto/CreateMessageDTO";
import { MessageRepository } from "../infra/mongo/repositories/MessageRepository";
import { IMessageRepository } from "../repositories/IMessageRepository";

injectable()
class CreateMessageUseCase {

    private messageRepository : IMessageRepository;

    constructor() {
        this.messageRepository = new MessageRepository();
    }

    async execute({to, text, roomId} : CreateMessageDTO) : Promise<any> {
        console.log({to, text, roomId})
        const message = await this.messageRepository.create({
            to,
            text,
            roomId
        });

        return message;
    }
}

export { CreateMessageUseCase };