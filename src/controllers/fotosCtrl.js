const client = require("../configs/database");
const path = require("path");

const fotosCtrl = {
    getOne: (req, res) => {

        // sacamos los parametros
        // ----------------------

        const { codigo_foto } = req.params

        client.connect()
        client.query("SELECT * FROM FOTOS WHERE (codigo_foto=$1)", [codigo_foto], (err, response) => {
            try {
                if (err) {
                    console.log("ERROR CONSULTA BD >>>", err)
                    res.send(err)
                } else {
                    if (response.rows.length <= 0) {
                        res.status(404)
                        res.send({ mensaje: "No se encontro la imagen" })
                    } else {
                        // console.log(response.rows[0].ubicacion)
                        res.sendFile(path.join(__dirname, '../images', `${codigo_foto}.jpg`))
                    }
                }
            } catch (error) {
                res.status(500)
                console.log("ERROR CONSULTA BD 2 >>>", error)
                res.send(error)
            }
        })

    }
}

module.exports = fotosCtrl;