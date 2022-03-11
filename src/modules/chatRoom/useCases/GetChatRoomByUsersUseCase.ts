import { injectable } from "tsyringe";
import { ObjectId } from "mongoose";
import { IChatRoomRepository } from "../repositories/IChatRoomRepository";
import { ChatRoomRepository } from "../infra/mongo/repositories/ChatRoomRepository";

@injectable()
class GetChatRoomByUsers {

    private chatRoomRepository : IChatRoomRepository;

    constructor() {
        this.chatRoomRepository = new ChatRoomRepository();
    }

    async execute(idUsers: ObjectId[]) : Promise<any> {
        const room = await this.chatRoomRepository.findByUsers(idUsers);
        return room;
    }
};

export { GetChatRoomByUsers };