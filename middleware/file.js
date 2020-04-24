const multer = require('multer')

// Directorio donde se guardaran los archivos, ene ste caso imagenes
const DIR = './public/'

const storage = multer.diskStorage({
    // carpeta en la que guardaremos las imagenes
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    // genera el nombre del archivo
    filename: (req, file, cb) => {
        // pone la fecha en la foto, el nombre, lo pasa a minusculas, le quita los espacios y le pone guiones
        const filename = Date.now() + '-' + file.originalname.toLowerCase().split(' ').join('-')
        cb(null, filename)
    }
})


const upload = multer({
    storage: storage,
    // filtro para asegurarnos de que recibimos una imagen
    fileFilter:(req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Solo acepta .png, .jpg, y .jpeg '))
        }
    }
})


module.exports = upload
