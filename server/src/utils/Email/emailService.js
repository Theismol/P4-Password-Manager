const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'accessarmor@gmail.com',
                pass: 'Accessarmor123!' 
            }
        });
    }

    sendEmail(to, subject, text) {
        const mailOptions = {
            from: 'accessarmor@gmail.com',
            to: to,
            subject: subject,
            text: text
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred while sending email:', error);
            } else {
                console.log('Email sent successfully:', info.response);
            }
        });
    }
}

module.exports = EmailService;
