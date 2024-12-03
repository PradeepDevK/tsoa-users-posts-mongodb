import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
};

export class UpdateUserDTO {
    @IsString()
    name?: string;

    @IsEmail()
    email?: string;
};

export interface UserResponse {
    id: string;
    name: string;
    email: string;
}