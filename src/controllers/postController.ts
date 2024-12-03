import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Route,
    Tags,
    Body,
    Path
} from 'tsoa';
import PostModel from "../models/Post";
import { CreatePostDTO, UpdatePostDTO, PostResponse } from "../dtos/post.dtos";
import mongoose from 'mongoose';


@Route('posts')
@Tags('Post')
export class PostController extends Controller {
    @Get('/')
    public async getPosts(): Promise<PostResponse []> {
        const posts = await PostModel.find();
        return posts.map((post) => ({
            id: post._id.toString(),
            title: post.title,
            content: post.content,
            userId: post.userId.toString(),
        }));
    }

    @Get('{postId}')
    public async getPost(@Path() postId: string): Promise<PostResponse | null> {
        const post = await PostModel.findById(postId);
        return post
            ? {
                id: post._id.toString(),
                title: post.title,
                content: post.content,
                userId: post.userId.toString(),
                }
            : null;
    }

    @Post('/')
    public async createPost(@Body() body: CreatePostDTO): Promise<PostResponse> {
        const post = await PostModel.create({
            ...body,
            userId: new mongoose.Types.ObjectId(body.userId), // Convert userId to ObjectId
        });
        return {
            id: post._id.toString(),
            title: post.title,
            content: post.content,
            userId: post.userId.toString(),
        };
    }

    @Put('{postId}')
    public async updatePost(@Path() postId: string, @Body() body: UpdatePostDTO): Promise<PostResponse | null> {
        const post = await PostModel.findByIdAndUpdate(postId, body, { new: true });
        return post
            ? {
                id: post._id.toString(),
                title: post.title,
                content: post.content,
                userId: post.userId.toString(),
            }
            : null;
    }

    @Delete('{postId}')
    public async deletePost(@Path() postId: string): Promise<PostResponse | null> {
        const post = await PostModel.findByIdAndDelete(postId);
        return post
        ? {
            id: post._id.toString(),
            title: post.title,
            content: post.content,
            userId: post.userId.toString(),
        }
        : null;
    }
}