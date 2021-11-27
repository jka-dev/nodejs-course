import {Schema, model} from 'mongoose';
import {User} from "../../types/user";

const UserSchema = new Schema<User>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    favourites: { type: [String] }
});

const UserModel = model<User>("Users", UserSchema);

export default UserModel;