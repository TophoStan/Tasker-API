import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserIdentity } from 'src/schema/userIdentity.schema';
import { compare, hash } from 'bcrypt';
import { User } from 'src/schema/userData.schema';
import { sign, verify } from 'jsonwebtoken';
import { JWTToken } from 'src/schema/token.class';

@Injectable()
export class UserService {

    constructor(@InjectModel(UserIdentity.name) private UserIdentityModel: Model<UserIdentity>,
        @InjectModel(User.name) private UserDataModel: Model<User>
    ) { }

    async getUserById(id: string) {

        return await this.UserDataModel.findOne({ id: id });
    }

    async registerUser(user: any): Promise<User> {

        const hashedPwd = await hash(user.password, 10);

        const createIdentityUser = await (await this.UserIdentityModel.create({
            username: user.username,
            email: user.email,
            password: hashedPwd
        })).save();

        const createUserData = await (await this.UserDataModel.create({
            id: createIdentityUser.id,
            username: createIdentityUser.username,
            email: createIdentityUser.email
        })).save();
        return createUserData;
    }

    async loginUser(user: UserIdentity): Promise<JWTToken> {

        const findUser = await this.UserIdentityModel.findOne({ email: user.email });

        if (!findUser) {
            throw new NotImplementedException('User not found');
        }

        const match = await compare(user.password, findUser.password);

        if (!match) {
            throw new NotImplementedException('Invalid password');
        }

        const userData = await this.UserDataModel.findOne({ id: findUser.id });

        const token = new JWTToken(sign({ id: userData.id }, process.env.JWT_SECRET, { expiresIn: '10h' }));

        return token;
    }

    async verifyToken(token: string): Promise<any> {
        const result = verify(token, process.env.JWT_SECRET);
        console.log(result);
        
        return result;
    }
}
