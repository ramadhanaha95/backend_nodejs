import { body, validationResult } from "express-validator"

export const login_validation = (username, password) => {
    //you can put some validation here
    if(username && password){
        return true
    }else{
        return false
    }
}

export const register_validation = (payload) => {
    var username = payload.username;
    var password = payload.password;
    var nama_lengkap = payload.nama_lengkap;
    var email = payload.email;
    var handphone = payload.handphone;
    var whatsapp = payload.whatsapp;
    
    //you can put some validation here
    if(username && password && nama_lengkap && email && handphone && whatsapp){
        return true
    }else{
        return false
    }
}