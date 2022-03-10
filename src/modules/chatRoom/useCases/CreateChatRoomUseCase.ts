import { injectable } from "tsyringe";
import { ChatRoomRepository } from "../infra/mongo/repositories/ChatRoomRepository";
import { IChatRoomRepository } from "../repositories/IChatRoomRepository";

@injectable()
class CreateChatRoomUseCase {

    private chatRoomRepository : IChatRoomRepository;

    constructor() {
        this.chatRoomRepository = new ChatRoomRepository();
    }

    async execute(idUsers: String[]) {
        const room = await this.chatRoomRepository.create(idUsers);

        return room;
    }
}

export { CreateChatRoomUseCase };