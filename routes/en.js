const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
	res.render("en/index")
})

module.exports = router