const router = require("express").Router();
const {User, Blog, Comment} = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try{
        const blogData = await Blog.findAll({
            include:[{
                model: User,
                attributes: ["username"]
            }]
        })
        const blogs = blogData.map(blog => blog.get({plain:true}))
        res.render("homepage", {
            blogs
        })
    } catch(error){
        res.status(500).json(error)
    }
});