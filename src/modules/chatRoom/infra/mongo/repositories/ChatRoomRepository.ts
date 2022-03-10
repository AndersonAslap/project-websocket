import { ChatRoom } from "../../../../../schemas/ChatRoom";
import { IChatRoomRepository } from "../../../repositories/IChatRoomRepository";

class ChatRoomRepository implements IChatRoomRepository {
    
    async create(idUsers: String[]): Promise<any> {
        const room = await ChatRoom.create({
            idUsers
        });

        return room;
    }

}

export { ChatRoomRepository };