import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PostsRepository } from "../repositories/PostsRepository";

class PostController {
  async create(request: Request, response: Response) {
    try {
      const { user_id } = request.params;
      const { content } = request.body;
      const postsRepository = getCustomRepository(PostsRepository);

      if (!content) {
        return response.status(400).json({
          error: "Content cannot be blank.",
        });
      }

      if (!user_id) {
        return response.status(400).json({
          error: "Every post needs a user.",
        });
      }

      const post = postsRepository.create({
        user_id,
        content,
      });

      await postsRepository.save(post);

      return response.status(201).json(post);
    } catch (error) {
      console.error(error.message);
      response.status(500).json({
        error: "Server error!",
      });
    }
  }

  async findPostsById(request: Request, response: Response) {
    try {
      const { user_id } = request.params;
      const postsRepository = getCustomRepository(PostsRepository);

      const posts = await postsRepository.find({
        user_id,
      });

      // if (!posts) {
      //   return response.status(400).json({
      //     error: "The user has no posts to display",
      //   });
      // }

      return response.status(201).json(posts);
    } catch (error) {
      console.error(error.message);
      response.status(500).json({
        error: "Server error!",
      });
    }
  }
}

export { PostController };