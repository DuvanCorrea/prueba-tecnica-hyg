const express = require("express")
const seguimientoCtrl = require("../controllers/seguimientoCrtl")
const router = express.Router()

router.get("/seguimiento", seguimientoCtrl.get)

module.exports=router;