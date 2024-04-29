import UserDTO from "../../dtos/user.dto.js";

export default class UserRepository {
    constructor(dao){
        this.dao = dao;
    }

    getUsers = () => {
        const result = this.dao.getUsers();
        return result;
    }

    getUserByEmail = (email) => {
        const user = this.dao.getUserByEmail(email)
        return user;
    }

    createUser =  (user) => {
        const newUser = new UserDTO(user);
        const result = this.dao.saveUser(newUser);
        return result;
    }

    updateUser = async (id, user) =>{
        const result = await this.dao.updateUser(id, user);
        return result
    }

    deleteUser = async (id) => {
        const result = await this.dao.delete(id)
        return result
    }

}