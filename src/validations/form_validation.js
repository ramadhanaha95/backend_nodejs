export function login_validation(username, password) {
    //you can put some validation here
    if(username && password){
        return true
    }else{
        return false
    }
}

export function username_validation(username) {
    function isLower(str) {
        return !/[A-Z]/.test(str) && /[a-z]/.test(str);
    }

    if(username){
        if(isLower(username)){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}

export function register_validation(payload) {
    var username = payload.username;
    var password = payload.password;
    var nama_lengkap = payload.nama_lengkap;
    var email = payload.email;
    var handphone = payload.handphone;
    var whatsapp = payload.whatsapp;

    function isLower(str) {
        return !/[A-Z]/.test(str) && /[a-z]/.test(str);
    }

    function getFirstChar(str) {
        return str.charAt(0);
    }
    var cek_username = isLower(username) // true/false
    
    if(getFirstChar(handphone) == 0){
        var cek_handphone = false
    }else{
        var cek_handphone = true
    }
    
    //you can put some validation here
    if(cek_username && password && nama_lengkap && email && cek_handphone && whatsapp){
        return true;
    }else{
        if(!cek_username){
            return "Username harus huruf kecil"
        }

        if(!password){
            return "Password salah"
        }

        if(!nama_lengkap){
            return "Nama lengkap salah"
        }

        if(!email){
            return "Email salah"
        }

        if(!cek_handphone){
            return "Handphone salah"
        }

        if(!whatsapp){
            return "Whatsapp salah"
        }
    }
}