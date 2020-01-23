const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send", (req, res) => {
  // console.log("trying to send an email")
  // console.log(req.body.name);
  // console.log(req.body.email);
  // console.log(req.body.message);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: "janmar.portfolio@gmail.com",
      pass: "portfolionijanmar"
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: req.body.email, // sender address
    to: "mar.temporary@gmail.com", // list of receivers
    subject: "Portfolio inquiry from " + req.body.name, // Subject line
    html:
      "<em>" +
      "Name of sender: " +
      req.body.name +
      "<br>" +
      "E-mail of sender: " +
      req.body.email +
      "<br>" +
      "Message: " +
      req.body.message +
      "</em>"
  };

  console.log(mailOptions);

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.json({
        data: {
          message: "message_not_sent"
        }
      });
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
    return res.json({
      data: {
        message: "message_sent"
      }
    });
  });
});

module.exports = router;
