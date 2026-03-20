import { Model } from 'mongoose';
import { UserDocument } from 'src/models/user.model';
import { User } from 'src/models/user.model';

export class UserService {
    constructor(private readonly userModel: Model<UserDocument>) {}

    async getUsers(): Promise<User[]> {
        return await this.userModel.find({}).lean().exec();
    }

    async getUserById(id: string): Promise<User | null> {
        return await this.userModel.findById(id).lean().exec();
    }
}