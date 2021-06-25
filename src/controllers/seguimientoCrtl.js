const client = require("../configs/database");

// QUERIS
const GET = "SELECT * FROM SEGUIMINETOS WHERE (PROYECTO_codigo_proyecto=$1) ORDER BY codigo_seguimiento DESC"
const POST = "INSERT INTO SEGUIMINETOS (fecha,descripccion,avance,PROYECTO_codigo_proyecto) VALUES ($1,$2,$3,$4)"

// Actualizar estado del proyecto
const UPDATE = "UPDATE PROYECTOS SET estados_codigo_estado=$1 WHERE (codigo_proyecto=$2);"

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

    post: (req, res) => {
        console.log(req.body)

        const { fecha, descripccion, avance, PROYECTO_codigo_proyecto, estadoProyecto } = req.body


        client.connect()
        client.query(POST, [fecha, descripccion, avance, PROYECTO_codigo_proyecto], (err, response) => {
            try {
                if (err) {
                    console.log("ERROR CONSULTA BD >>>", err)
                    res.send(err)
                } else {
                    client.query(UPDATE, [estadoProyecto, PROYECTO_codigo_proyecto], (err, response) => {
                        try {
                            if (err) {
                                console.log("ERROR CONSULTA BD >>>", err)
                                res.send(err)
                            } else {

                                // De forma asincrona se guarda un reguistro en la
                                // tabla de autorias

                                client.query("INSERT INTO AUDITORIAS (codigo_proyecto, fecha) VALUES ($1,$2)", [PROYECTO_codigo_proyecto, fecha], (err, response) => {
                                    try {
                                        if (err) {
                                            console.log("ERROR CONSULTA BD >>>", err)
                                            res.send(err)
                                        }
                                        console.log("Guardo auditoria *******************************")
                                        res.send({ mensaje: "seguimiento guardado y estado actualizado" })

                                    } catch (error) {
                                        console.log("ERROR CONSULTA BD >>>", error)
                                    }
                                })


                            }
                        } catch (error) {
                            console.log("ERROR CONSULTA BD >>>", error)
                            res.status(500)
                            res.send(error)
                        }
                    })
                }
            } catch (error) {
                console.log("ERROR CONSULTA BD >>>", err)
                res.status(500)
                res.send(error)
            }
        })

    },
}

module.exports = seguimientoCtrl;