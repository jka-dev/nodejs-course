import { User } from "../types/user";
import { usersList } from "./moqUsersData";
import { v4 } from 'uuid';
import bcrypt from "bcrypt";

export class UsersRepository {

    constructor() {}
    get = (email: string) : User | undefined => {
        return usersList.items.find(item => item.email == email);
    };

    getById = (id: string) : User | undefined => {
        return usersList.items.find(item => item.id == id);
    };

    getAll = (): User[] => {
        return usersList.items;
    };

    add = (user: User): string => {
        console.log(usersList.items);
        const currentUser = this.get(user.email);
        if(currentUser) {
            throw new Error('Email already exists');
        }
        user.id = v4();
        user.password = bcrypt.hashSync(user.password, 7);
        usersList.items.push(user);
        usersList.total++;
        return user.id;
    };

    update = (user: User): void => {
        const currentIndex = usersList.items.indexOf(user);
        if (currentIndex == -1) {
            throw new Error('Movie does not exist');
        }
        usersList.items[currentIndex] = {...usersList.items[currentIndex], ...user};
    }

}