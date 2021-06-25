const express = require("express")
const seguimientoCtrl = require("../controllers/seguimientoCrtl")
const router = express.Router()

router.get("/seguimientos/:codigo_proyecto", seguimientoCtrl.get)

module.exports = router;