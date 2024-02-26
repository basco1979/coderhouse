import UserDTO from "../../dtos/user.dto.js";

export default class UserRepository {
    constructor(dao){
        this.dao = dao;
    }

    getUsers = () => {
        const result = this.dao.get();
        return result;
    }

    createUser =  (user) => {
        const newUser = new UserDTO(user);
        const result = this.dao.post(newUser);
        return result;
    }

}