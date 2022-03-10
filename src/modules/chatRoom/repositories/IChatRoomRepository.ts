interface IChatRoomRepository {
    create(idUsers: String[]) : Promise<any>;
}

export { IChatRoomRepository };