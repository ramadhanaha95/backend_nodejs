import Tesseract from "tesseract.js";

export function Tesseract(payload) {
    Tesseract.recognize(
        // this first argument is for the location of an image it can be a //url like below or you can set a local path in your computer
        'https://www.tokotalk.com/help/wp-content/uploads/2020/08/identity_card_example.b686f703.jpg',
        // this second argument is for the laguage 
        'eng', {
            logger: m => console.log(m.progress)
        }
    ).then(({
        data: {
            text
        }
    }) => {
        return text
    })
}

export function getDataKtp(payload) {
    const array = payload.split("\n");
    let nik = array[2].split(" : ");
    let nama_lengkap = array[3].split(" : ");

    let ttl = array[4].split(" : ");
    let tempat_lahir = ttl[1].split(", ")[0];
    let tanggal_lahir = ttl[1].split(", ")[1];

    let jk = array[5].split(" : ");
    let jenis_kelamin = jk[1].split(" ")[0];

    let data = {
        nik: nik[1],
        nama_lengkap: nama_lengkap[1],
        tempat_lahir: tempat_lahir,
        tanggal_lahir: tanggal_lahir,
        jenis_kelamin: jenis_kelamin
    }

    return data
}