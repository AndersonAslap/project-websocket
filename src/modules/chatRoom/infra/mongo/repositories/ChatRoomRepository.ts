import { ObjectId } from "mongoose";
import { ChatRoom } from "../../../../../schemas/ChatRoom";
import { IChatRoomRepository } from "../../../repositories/IChatRoomRepository";

class ChatRoomRepository implements IChatRoomRepository {

    private repository = ChatRoom;
    
    async create(idUsers: String[]): Promise<any> {
        const room = await this.repository.create({
            idUsers
        });

        return room;
    }

    async findByUsers(idUsers: ObjectId[]) : Promise<any> {
        const room = await this.repository.findOne({
            idUsers: {
                $all: idUsers
            }
        }).exec();

        console.log(room);

        return room;
    }

}

export { ChatRoomRepository };