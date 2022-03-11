import { ObjectId } from "mongoose";
import { ChatRoom } from "../../../../../schemas/ChatRoom";
import { IChatRoomRepository } from "../../../repositories/IChatRoomRepository";

class ChatRoomRepository implements IChatRoomRepository {
    
    async create(idUsers: String[]): Promise<any> {
        const room = await ChatRoom.create({
            idUsers
        });

        return room;
    }

    async findByUsers(idUsers: ObjectId[]) : Promise<any> {
        const room = await ChatRoom.findOne({
            idUsers: {
                $all: idUsers
            }
        }).exec();

        console.log(room);

        return room;
    }

}

export { ChatRoomRepository };