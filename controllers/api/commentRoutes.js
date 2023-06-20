const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body, 
            user_id: req.session.user_id
        })
        res.json(newComment)
    } catch (error) {
        res.status(500).json(error)
    }
})