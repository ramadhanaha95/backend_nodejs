import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const GetJwtToken = (id,role_id,email_verification_status) => {
    const token = Jwt.sign({
        id: id,
        role_id: role_id,
        email_verification_status: email_verification_status
    }, process.env.TOKEN_SECRET, {
        expiresIn: '1h'
    });

    return token
}

export const VerifyToken = (req, res, next) => {
    const theToken =
        req.body.token || req.query.token || req.headers.token;

    if (!theToken) {
        return res.status(403).json("A token is required for authentication")
    }
    try {
        const decoded = Jwt.verify(theToken, process.env.TOKEN_SECRET)
        req.user = decoded
        if(decoded.email_verification_status == 1){
            return res.status(403).json("Please check and verify the email first")
        }
    } catch (err) {
        return res.status(401).json("Invalid Token")
    }
    return next();
};