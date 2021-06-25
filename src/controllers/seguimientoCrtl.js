const client = require("../configs/database");

// QUERIS
const GET = "SELECT * FROM SEGUIMINETOS WHERE (PROYECTO_codigo_proyecto=$1)" 

const seguimientoCtrl = {
    get: (req, res) => {

        //obtener parametros
        // -----------------

        const { codigo_proyecto } = req.params

        // Traer el proyecto
        // -----------------

        client.connect()
        client.query(GET, [codigo_proyecto], (err, response) => {
            try {
                if (err) {
                    console.log("ERROR CONSULTA BD >>>", err)
                    res.send(err)
                } else {
                    if (response.rows.length <= 0) {
                        res.status(404)
                        res.send({ mensaje: "No se encontro el proyecto" })
                    } else {
                        res.send(response.rows)
                    }
                }
            } catch (error) {
                res.status(500)
                console.log("ERROR CONSULTA BD >>>", error)
                res.send(error)
            }
        })

    },
}

module.exports = seguimientoCtrl;