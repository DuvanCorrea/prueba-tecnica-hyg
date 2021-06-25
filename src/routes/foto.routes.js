const express = require("express")
const fotosCtrl = require("../controllers/fotosCtrl")
const router = express.Router()

router.get("/foto/:codigo_foto", fotosCtrl.getOne)

module.exports = router;