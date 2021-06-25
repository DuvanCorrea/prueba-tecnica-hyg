const express = require("express")
const seguimientoCtrl = require("../controllers/seguimientoCrtl")
const router = express.Router()

router.get("/seguimientos/:codigo_proyecto", seguimientoCtrl.get)
router.post("/seguimiento", seguimientoCtrl.post)

module.exports = router;