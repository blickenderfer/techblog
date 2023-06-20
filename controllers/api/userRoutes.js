const router = require("express").Router();
const { User } = require("../../models")

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        if (!userData) {
            res.status(400).json({ message: "Login information incorrect" })
            return
        }
        const goodPassword = await userData.checkPassword(req.body.password)
        if (!goodPassword) {
            res.status(400).json({ message: "Login information incorrect" })
            return
        }
        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true
            res.json({user:userData, message: "Login successful"})
        })
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router

