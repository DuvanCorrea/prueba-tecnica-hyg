const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())

const { PORT } = require("./configs/keys");
app.set("PORT", PORT)

// Rutas
const seguimientoRoutes = require("./routes/seguimiento.routes")
const proyectoRoutes = require("./routes/proyecto.routes")
const fotoRoutes = require("./routes/foto.routes")

// CORS
var whitelist = ["https://www.ferreteria-mithaes-pdv.com"];

var corsOptions = {
  origin: function (origin, callback) {
    if (true) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions)); 


app.use("/api", seguimientoRoutes)
app.use("/api", proyectoRoutes)
app.use("/api", fotoRoutes)

module.exports = app