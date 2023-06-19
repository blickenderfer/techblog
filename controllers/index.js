const router = require("express").Router();
const apiRoutes = require("./api")
const basicRoutes = require("./basicRoutes")
router.use("/", basicRoutes)
router.use("/api", apiRoutes)
module.exports = router