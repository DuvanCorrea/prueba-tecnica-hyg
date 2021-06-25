const client = require("../configs/database");

// QUERIS
const GETONE = "SELECT P.codigo_proyecto, P.fecha_inicio, P.fecha_fin, P.objetivo, P.descripccion, P.direccion, P.costo_total, P.longitud, P.latitud, L.codigo_lider, L.nombre AS nombre_lider, E.codigo_estado, E.nombre AS nombre_estado, EN.nit, EN.nombre AS nombre_entidad FROM PROYECTOS P, LIDERES L, ESTADOS E, ENTIDADES EN WHERE (codigo_proyecto=$1 AND P.LIDER_codigo_lider=L.codigo_lider AND P.ESTADOS_codigo_estado=E.codigo_estado AND P.ENTIDAD_nit=EN.nit)"

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
                    res.send(response.rows)
                }
            } catch (error) {
                console.log("ERROR CONSULTA BD >>>", err)
                res.send(error)
            }
        })

    }
}

module.exports = proyectoCtrl;