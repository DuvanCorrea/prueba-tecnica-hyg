const client = require("../configs/database");

// QUERIS
const GETONE = "SELECT P.codigo_proyecto, P.fecha_inicio, P.fecha_fin, P.objetivo, P.descripccion, P.direccion, P.costo_total, P.longitud, P.latitud, L.codigo_lider, L.nombre AS nombre_lider, E.codigo_estado, E.nombre AS nombre_estado, EN.nit, EN.nombre AS nombre_entidad FROM PROYECTOS P, LIDERES L, ESTADOS E, ENTIDADES EN WHERE (codigo_proyecto=$1 AND P.LIDER_codigo_lider=L.codigo_lider AND P.ESTADOS_codigo_estado=E.codigo_estado AND P.ENTIDAD_nit=EN.nit)"

// Aqui se haran 3 quieris ya que puede consultarse por codigo de proyecto, 
// lider o fecha d einicio del proyecto
// ------------------------------------------------------------------------
const POSTWITHPROYECTO = "SELECT P.codigo_proyecto, P.fecha_inicio, P.fecha_fin, P.objetivo, P.descripccion, P.direccion, P.costo_total, P.longitud, P.latitud, L.codigo_lider, L.nombre AS nombre_lider, E.codigo_estado, E.nombre AS nombre_estado, EN.nit, EN.nombre AS nombre_entidad FROM PROYECTOS P, LIDERES L, ESTADOS E, ENTIDADES EN WHERE (codigo_proyecto=$1 AND P.LIDER_codigo_lider=L.codigo_lider AND P.ESTADOS_codigo_estado=E.codigo_estado AND P.ENTIDAD_nit=EN.nit) ORDER BY p.codigo_proyecto DESC"
const POSTWITHLIDER = "SELECT P.codigo_proyecto, P.fecha_inicio, P.fecha_fin, P.objetivo, P.descripccion, P.direccion, P.costo_total, P.longitud, P.latitud, L.codigo_lider, L.nombre AS nombre_lider, E.codigo_estado, E.nombre AS nombre_estado, EN.nit, EN.nombre AS nombre_entidad FROM PROYECTOS P, LIDERES L, ESTADOS E, ENTIDADES EN WHERE (P.LIDER_codigo_lider=$1 AND P.LIDER_codigo_lider=L.codigo_lider AND P.ESTADOS_codigo_estado=E.codigo_estado AND P.ENTIDAD_nit=EN.nit) ORDER BY p.codigo_proyecto DESC"
const POSTWITHFECHA = "SELECT P.codigo_proyecto, P.fecha_inicio, P.fecha_fin, P.objetivo, P.descripccion, P.direccion, P.costo_total, P.longitud, P.latitud, L.codigo_lider, L.nombre AS nombre_lider, E.codigo_estado, E.nombre AS nombre_estado, EN.nit, EN.nombre AS nombre_entidad FROM PROYECTOS P, LIDERES L, ESTADOS E, ENTIDADES EN WHERE (P.fecha_inicio=$1 AND P.LIDER_codigo_lider=L.codigo_lider AND P.ESTADOS_codigo_estado=E.codigo_estado AND P.ENTIDAD_nit=EN.nit) ORDER BY P.codigo_proyecto DESC"


let proyectosDevolver = []
let contador;

const proyectoCtrl = {
    get: (req, res) => {
        console.log("holi")
    },

    getOne: (req, res) => {

        //obtener parametros
        // -----------------

        const { codigo_proyecto } = req.params

        // Traer el proyecto
        // -----------------

        client.connect()
        client.query(GETONE, [codigo_proyecto], (err, response) => {
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
                console.log("ERROR CONSULTA BD >>>", err)
                res.send(error)
            }
        })

    },

    post: (req, res) => {

        let queryActual;
        let variableBusqueda;

        // estraemos parametro 
        // -------------------
        const { codigo_proyecto, codigo_lider, fecha_inicio } = req.body

        if (codigo_proyecto) {
            queryActual = POSTWITHPROYECTO
            variableBusqueda = codigo_proyecto
        } else if (codigo_lider) {
            queryActual = POSTWITHLIDER
            variableBusqueda = codigo_lider
        } else if (fecha_inicio) {
            queryActual = POSTWITHFECHA
            variableBusqueda = fecha_inicio
        } else {
            res.status(404)
            res.send({ mensaje: "No se encontro el proyecto" })
        }

        // consultar bd
        // ------------

        client.connect()
        client.query(queryActual, [variableBusqueda], (err, response) => {
            try {
                if (err) {
                    console.log("ERROR CONSULTA BD >>>", err)
                    res.send(err)
                } else {
                    if (response.rows.length <= 0) {
                        res.status(404)
                        res.send({ mensaje: "No se encontro el proyecto" })
                    } else {
                        proyectosDevolver = response.rows
                        contador = proyectosDevolver.length

                        // hacer consulta pasa saber que cantidad de seguimientos tiene cada proyecto
                        proyectosDevolver.forEach(e => {


                            client.query("SELECT count(*) FROM SEGUIMINETOS WHERE (PROYECTO_codigo_proyecto=$1)", [e.codigo_proyecto], (err, response) => {
                                try {

                                    if (err) {
                                        console.log("ERROR CONSULTA BD >>>", err)
                                        res.send(err)
                                    } else {
                                        // console.log("Aqui", response.rows)
                                        e.count = response.rows[0].count

                                        contador -= 1
                                        // aqui finalmente se responde al cliente
                                        if (contador == 0) {
                                            res.send(proyectosDevolver)
                                        }
                                    }
                                } catch (error) {
                                    console.log("ERROR CONSULTA BD >>>", err)
                                    res.status(500)
                                    res.send(error)
                                }
                            })


                        })

                        // res.send(proyectosDevolver)

                        // res.send(response.rows)
                    }
                }
                console.log("fin try")
            } catch (error) {
                console.log("ERROR CONSULTA BD >>>", err)
                res.status(500)
                res.send(error)
            }
        })



    }
}

module.exports = proyectoCtrl;