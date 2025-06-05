import {PostRepository} from './post.repository.js';

export class PostController{

constructor(){
    this.postRepository= new PostRepository();
}

async createPost(req,res,next){
    try{
        const result = await this.postRepository.CreatePost(req.userId,req.body.caption,req.body.imageUrl);
        return res.status(200).send(result);
    }catch(err){
        console.log(err);
        next(err);
    }
   

}


async getAllPost(req,res,next){
    try{
        const result = await this.postRepository.GetAllPosts();
        return res.status(200).send(result);
    }catch(err){
        console.log(err);
        next(err);
    }
   

}




async getPost(req,res,next){
    try{
        const result = await this.postRepository.GetPost(req.params.postId);
        return res.status(200).send(result);
    }catch(err){
        console.log(err);
        next(err);
    }
}

async getUserPost(req,res,next){
    try{
        const result = await this.postRepository.GetUserPost(req.params.userId);
        return res.status(200).send(result);
    }catch(err){
        console.log(err);
        next(err);
    }
}

async DeletePost(req,res,next){
    try{
        const result = await this.postRepository.DeletePost(req.params.postId);
        return res.status(200).send(result);
    }catch(err){
        console.log(err);
        next(err);
    }
}

async updatePost(req,res,next){
    try{
        const {imageUrl,caption} = req.body;
        const result = await this.postRepository.UpdatePost(req.params.postId,imageUrl,caption);
        return res.status(200).send(result);
    }catch(err){
        console.log(err);
        next(err);
    }
}

}