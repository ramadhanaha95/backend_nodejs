import Tesseract from "tesseract.js";

export async function proses_gambar(payload) {
    let data = ''
    await Tesseract.recognize(
        // this first argument is for the location of an image it can be a //url like below or you can set a local path in your computer
        payload,
        // this second argument is for the laguage 
        'eng', {
            logger: m => console.log(m.progress)
        }
    ).then(({
        data: {
            text
        }
    }) => {
        data = text
    })
    return data
}

export function getDataKtp(payload) {
    // const array = payload.split("\n");
    // let nik = array[2].split(" : ");
    // let nama_lengkap = array[3].split(" : ");

    // let ttl = array[4].split(" : ");
    // let tempat_lahir = ttl[1].split(", ")[0];
    // let tanggal_lahir = ttl[1].split(", ")[1];

    // let jk = array[5].split(" : ");
    // let jenis_kelamin = jk[1].split(" ")[0];

    // let data = {
    //     nik: nik[1],
    //     nama_lengkap: nama_lengkap[1],
    //     tempat_lahir: tempat_lahir,
    //     tanggal_lahir: tanggal_lahir,
    //     jenis_kelamin: jenis_kelamin
    // }

    // return data

    var result = ''
    var arrayfill = '';
    var array = [17];
    array[16] = ''
    var o = 0
    var proses_ktp = payload
    console.log(proses_ktp.length)
    if (proses_ktp.length < 150 || proses_ktp.length > 450) {
        let hasil = {
            msg_user : "Foto terlihat kurang jelas mohon coba lagi",
            msg_frontend : "Foto Tidak Terlihat Seperti KTP (KTP Identik Length Antara 150-450)"
        }
        return hasil
    } else {
        for (var i = 0; i < proses_ktp.length; i++) {
            result += proses_ktp[i]
            if (proses_ktp[i + 1] == '\n' && proses_ktp[i + 2] == '\n') {
                i += 2
                result += '\n'
            }
        }

        //Menambah Enter Gol Darah
        for (var i = 0; i < proses_ktp.length; i++) {
            arrayfill += result[i]
            if (o == 5) {
                if (result[i + 1] + result[i + 2] == "Go") {
                    array[o] = arrayfill
                    arrayfill = ''
                    o += 1
                    i += 10
                }
            } else if (result[i + 1] == '\n') {
                array[o] = arrayfill
                arrayfill = ''
                i += 1
                o += 1
            }

            if (result[i] == '=' || result[i] == '©' || result[i] == '[' || result[i] == ']' || result[i] == ':' || result[i] == '+' || result[i] == ';' || result[i] == "“" || result[i] == "|") {
                if (arrayfill.length < 7)
                    arrayfill = ' '
            }
        }

        if (array[16].length > 5) {
            array[7] = array[7] + array[8]
            array[8] = array[9]
            array[9] = array[10]
            array[10] = array[11]
            array[11] = array[12]
            array[12] = array[13]
            array[13] = array[14]
            array[14] = array[15]
            array[15] = array[16]
        }

        if (array[15] == undefined || array[15] == '') {
            array.fill(' ', 0, 15)
            proses_ktp = '  '
        }
        var regExp = /[a-zA-Z]/g;
        var ktp_nik = array[2].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", "")
        if (regExp.test(ktp_nik)) {
            let hasil = {
                msg_user : "Foto terlihat kurang jelas mohon coba lagi",
                msg_frontend : "Nik Terbaca Ada Hurufnya"
            }
            return hasil
        } else {

            let hasil = {
                // Provinsi: array[0].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                // Kota: array[1].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                NIK: array[2].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                Nama: array[3].replace("Nama", "").replace("-", "").replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                // Tempat_Tgl_Lahir: array[4].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                // Jenis_Kelamin: array[5].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                // Gol_Darah: array[6].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                // Alamat: array[7].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                // RT_RW: array[8].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                // Kel_Desa: array[9].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                // Kecamatan: array[10].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                // Agama: array[11].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                // Status_Perkawinan: array[12].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                // Pekerjaan: array[13].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                // Kewarganegaraan: array[14].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                // Berlaku_Hingga: array[15].replace("  ", "").replace("   ", "").replace("    ", "").replace("     ", ""),
                data: proses_ktp.length
            }
            return hasil
        }
    }
}