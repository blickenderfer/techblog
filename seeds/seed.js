const sequelize = require("../config/connection");
const {User, Blog, Comment} = require("../models");
const blogSeeds = require("./blogSeeds.json");
const commentSeeds = require("./commentSeeds.json");
const userSeeds = require("./userSeeds.json");

const seedDatabase = async () => {
    await sequelize.sync({
        force: true
    })
    const users = await User.bulkCreate(userSeeds, {
        individialHooks: true,
        returning: true
    })
    for(const blog of blogSeeds){
        await Blog.create({
            ...blog, 
            user_id: users[Math.floor(Math.random()*users.length)].id
        })
    }
    await Comment.bulkCreate(commentSeeds)
    process.exit(0)
}

seedDatabase();