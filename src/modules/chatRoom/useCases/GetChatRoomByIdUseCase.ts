import { ChatRoomRepository } from "../infra/mongo/repositories/ChatRoomRepository";
import { IChatRoomRepository } from "../repositories/IChatRoomRepository";

class GetChatRoomByIdUseCase {

    private chatRoomRepository : IChatRoomRepository;

    constructor() {
        this.chatRoomRepository = new ChatRoomRepository();
    }

    async execute(idChatRoom) : Promise<any> {
        const room = await this.chatRoomRepository.findById(idChatRoom);

        return room;
    }
}

export { GetChatRoomByIdUseCase };