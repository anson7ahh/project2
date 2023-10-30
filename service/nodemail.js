const nodemailer = require('nodemailer')


const sendMail = async ({ email, html }) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USERNAME, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"new order" <no-relply@cuahangdientu.com>', // sender address
        to: email, // list of receivers
        subject: "new order ", // Subject line
        html: html, // html body
    });

    return info
}

module.exports = sendMail







