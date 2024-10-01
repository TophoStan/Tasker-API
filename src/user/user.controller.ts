import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserIdentity } from 'src/schema/userIdentity.schema';
import { User } from 'src/schema/userData.schema';
import { JWTToken } from 'src/schema/token.class';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }


    
    @Post()
    async registerUser(@Body() user: UserIdentity): Promise<User> {
        return await this.userService.registerUser(user);
    }

    @Post('login')
    async loginUser(@Body() user: UserIdentity): Promise<JWTToken> {
        const token = await this.userService.loginUser(user);
        return token;
    }

    @Get(':id')
    async getUser(@Param() params): Promise<User> {
        return await this.userService.getUserById(params.id);
    }

}
