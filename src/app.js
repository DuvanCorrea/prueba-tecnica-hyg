const express = require("express")
const app = express()

app.use(express.json())

const { PORT } = require("./configs/keys");
app.set("PORT", PORT)

// Rutas
const seguimientoRoutes = require("./routes/seguimiento.routes")
const proyectoRoutes = require("./routes/proyecto.routes")


app.use("/api", seguimientoRoutes)
app.use("/api", proyectoRoutes)



module.exports = app