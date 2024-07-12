const multer = require("multer")

const storage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null,"./storage")  
    },
    filename : function(req,file,cb){
        //cb call back function
        cb(null,file.originalname)
    }
})

module.exports = {multer,storage}
