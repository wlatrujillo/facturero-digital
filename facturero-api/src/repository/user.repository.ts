import { Schema, Types } from "mongoose";
import { IUser, User } from "../model/user";
import RepositoryBase from "./base.repository";

class UserRepository extends RepositoryBase<IUser> {
    constructor() {
        super(User);
    }

    async findById(_id: Types.ObjectId): Promise<IUser | null> {

        const user = await User.findById(_id)
            .populate("branch")
            .exec();

        return user;
    }
}

Object.seal(UserRepository);
export default UserRepository;
