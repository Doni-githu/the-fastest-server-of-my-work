import { Router } from "express";
import Post from "../schemas/post";
import client from "../client";

const router = Router()

router.get('/posts', async (req, res) => {
    const skip = 0
    const limit = 100
    try {
        const result = await client.get("posts")
        if (result) {
            return res.status(200).json(JSON.parse(result))
        }

        const posts = await Post.find().skip(skip).limit(limit).lean()
        client.set("posts", JSON.stringify(posts))
        return res.status(200).json(posts)
    } catch (error) {
        console.log(error)
    }
})

router.get('/posts/:id', async (req, res) => {
    const id = req.params.id
    const post = await client.get(`post:${id}`)
    if (post) {
        res.status(200).json(JSON.parse(post))
    } else {
        const post2 = await Post.findById(id).lean()
        client.set(`post:${id}`, JSON.stringify(post2))
        return res.status(200).json(post2)
    }
})

router.post('/posts', async (req, res) => {
    const data = req.body
    const result = await Post.create(data)
    res.status(200).json(result)
})


export default router