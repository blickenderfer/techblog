const router = require("express").Router()
const {Blog} = require("../../models")
const withAuth = require("../../utils/auth")

router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = Blog.create({
            ...req.body, 
            user_id: req.session.user_id
        }) 
        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const postData = await Blog.destroy({
           where: {
            id: req.params.id, 
            user_id: req.session.user_id
           } 
        }) 
        if (!postData) {
            res.status(404).json({message:"Post ID not found!"})
            return
        } 
        res.status(200).json(postData)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:id", withAuth, async (req, res) => {
    try {
        const currentPost = await Blog.findByPk(req.params.id)
        currentPost.title = req.body.title
        currentPost.description = req.body.description
        await currentPost.save()
        const allPosts = await Blog.findAll()
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router