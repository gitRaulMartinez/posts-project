const fs = require('fs')

const deleteImage = async (carpeta, image) => {
    try {
        const path = './public/images/'+carpeta+'/'+image
        if(fs.existsSync(path)){
            fs.unlinkSync(path)
        }
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = deleteImage
