import {
    Controller,
    Get,
    Put,
    Post,
    Delete,
    Route,
    Tags,
    Body,
    Path
} from 'tsoa';
import { CreateUserDTO, UpdateUserDTO, UserResponse } from "../dtos/user.dtos";
import UserModel from "../models/User";

@Route("users")
@Tags('User')
export class UserController extends Controller {
    @Get('/')
    public async getUsers(): Promise<UserResponse[]> {
        const users = await UserModel.find();
        return users.map((user) => ({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        }));
    }

    @Get('{userId}')
    public async getUser(@Path() userId: string): Promise<UserResponse | null> {
        const user = await UserModel.findById(userId);
        return user
            ? { id: user._id.toString(), name: user.name, email: user.email }
            : null;
    }

    @Post('/')
    public async createUser(@Body() body: CreateUserDTO): Promise<UserResponse> {
        const user = await UserModel.create(body);
        return { id: user._id.toString(), name: user.name, email: user.email };
    }

    @Put('{userId}')
    public async updateUser(@Path() userId: string, @Body() body: UpdateUserDTO): Promise<UserResponse | null> {
        const user = await UserModel.findByIdAndUpdate(userId, body, { new: true });
        return user
            ? { id: user._id.toString(), name: user.name, email: user.email }
            : null;
    }

    @Delete('{userId}')
    public async deleteUser(@Path() userId: string): Promise<UserResponse | null> {
        const user = await UserModel.findByIdAndDelete(userId);
        return user
            ? { id: user._id.toString(), name: user.name, email: user.email }
            : null;
    }
}