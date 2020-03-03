require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send", (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: "janmar.portfolio@gmail.com",
      pass: process.env.EMAIL_PASS
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: req.body.email, // sender address
    to: "janmarroquejr@gmail.com", // list of receivers
    subject: "Portfolio inquiry from " + req.body.name, // Subject line
    html:
      "<em>" +
      "Name of sender: " +
      req.body.name +
      "<br>" +
      "E-mail of sender: " +
      req.body.email +
      "<br>" +
      "Contact : " +
      req.body.contact +
      "<br>" +
      "Message: " +
      req.body.message +
      "</em>"
  };

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
