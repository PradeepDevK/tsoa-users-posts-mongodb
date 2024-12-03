import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    userId: string;
}

export class UpdatePostDTO {
    @IsString()
    title?: string;

    @IsString()
    content?: string;
}

export interface PostResponse {
    id: string;
    title: string;
    content: string;
    userId: string;
  }