import { User } from "../types/user";
import bcrypt from "bcrypt";
import UserModel from "./models/user";

export class UsersRepository {

    constructor() {}
    get = async (email: string) => {
        return await UserModel.findOne({email});
    };

    getById = async (id: string) => {
        return await UserModel.findOne({_id: id});
    };

    add = async (user: User): Promise<string> => {
        const currentUser = await this.get(user.email);

        if(currentUser) {
            throw new Error('Email already exists');
        }

        user.password = bcrypt.hashSync(user.password, 7);
        const {_id} = await UserModel.create(user);

        return _id;
    };

    update = async (user: User) => {
        const currentUser : any = await UserModel.findById(user._id);

        if (!currentUser) {
            throw new Error('User does not exist');
        }
        Object.keys(user).forEach(key => currentUser[key] = user[key]);

        await currentUser.save();
    }

}