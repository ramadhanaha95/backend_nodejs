import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'contact.doppa@gmail.com',
        pass: 'gobmuatjujipxmaw'
    }
});

export const mailOptions = {
    from: 'contact.doppa@gmail.com',
    to: '',
    subject: 'Sending Email using Node.js',
    html: ''
};