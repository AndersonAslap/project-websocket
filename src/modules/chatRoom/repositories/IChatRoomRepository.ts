import { ObjectId } from "mongoose";

interface IChatRoomRepository {
    create(idUsers: String[]) : Promise<any>;
    findByUsers(idUsers: ObjectId[]) : Promise<any>;
    findById(idChatRoom: string) : Promise<any>;
}

export { IChatRoomRepository };