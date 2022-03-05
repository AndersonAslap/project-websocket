
interface IUserCreateDTO {
    email: string;
    socket_id: string;
    avatar: string;
    name: string;
};


interface IUserUpdateDTO {
    id: string;
    socket_id: string;
    avatar: string;
    name: string;
}

export { IUserCreateDTO, IUserUpdateDTO };