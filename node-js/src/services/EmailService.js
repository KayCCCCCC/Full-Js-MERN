const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');

const sendEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_ACCOUNT, // generated ethereal user
            pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
    });
    transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));

    let listItem = '';
    const attachImage = []
    orderItems.forEach((order) => {
        listItem += `<div>
    <div>
      Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></div>
      <div>Bên dưới là hình ảnh của sản phẩm</div>
    </div>`
        attachImage.push({ path: order.image })
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: 'nguyenngothanhnha2003kg@gmail.com', // list of receivers
        subject: "Bạn đã đặt hàng tại shop LẬP trình thật dễ", // Subject line
        html: `
        <div
        style="max-width: 400px; margin: 50px auto; padding: 30px; text-align: center; font-size: 120%; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); position: relative;">
    
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDn7YDq7gsgIdHOEP2_Mng6Ym3OzmvfUQvQ&usqp=CAU"
            alt="Noto Image" style="max-width: 100px; height: auto; display: block; margin: 0 auto; border-radius: 50%;">
    
        <h2 style="text-transform: uppercase; color: #3498db; margin-top: 20px; font-size: 28px; font-weight: bold;">
            Welcome to MERN</h2>
    
        <div style="font-size: 18px; color: #555; margin-bottom: 30px;">
            Sản phẩm của bạn: <span style="font-weight: bold; color: #e74c3c;">${listItem}</span>
        </div>
    
        <p style="color: #888; font-size: 14px;">Powered by MERN</p>
    
    </div>
            `,
        attachments: attachImage,
    });
}

module.exports = {
    sendEmailCreateOrder
}