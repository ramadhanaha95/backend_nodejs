import CryptoJS from "crypto-js";

const SetResponseJsonDecrypt = (payload) =>  {
    const keyA = CryptoJS.enc.Utf8.parse("rEgArfRiEndsWonoGIrI15042021aDsA"); // change to your key
    const ivA = CryptoJS.enc.Utf8.parse("GIrI15042021aDsA");

    // let resp_encrypt = CryptoJS.AES.encrypt(JSON.stringify(payload), keyA, {
    //     iv: ivA
    // }).toString();

    let resp_decrypt = CryptoJS.AES.decrypt(payload, keyA, {
        iv: ivA
    }).toString(CryptoJS.enc.Utf8);

    return JSON.parse(resp_decrypt)
}

export {SetResponseJsonDecrypt}