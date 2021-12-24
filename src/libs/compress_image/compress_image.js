import sharp from 'sharp'

export async function compress(image,image_quality) {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789QdadwjkbdadjwhagfbjwadheauifjebfiuegbiuafbeaiuhmnvdmnvieubJIUWGFBDBI';
    let temp_file = ''
            for (let i = 0; i < 15; i++) {
                temp_file += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
            }
    let data = temp_file+'.webp'
    let dir_data = './src/temp_file/'+data
    await sharp(image)
        .webp({
            quality: image_quality
        })
        .toFile(dir_data);
        console.log(dir_data)
    return dir_data
}