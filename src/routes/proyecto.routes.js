const express = require("express")
const proyectoCtrl = require("../controllers/proyectoCtrl")
const router = express.Router()

router.get("/proyectos", proyectoCtrl.get)
router.post("/proyectos", proyectoCtrl.post)
router.get("/proyectos/:codigo_proyecto", proyectoCtrl.getOne)

module.exports = router;