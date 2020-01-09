// var nodemailer = require('nodemailer');
// var dotenv = require('dotenv').config()

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: `${process.env.EMAIL}`,
//       pass: `${process.env.PASSWORD}`
//     }
// });

//   const content = `
//   <p>Dear ${},</p>
//   <p>Thank you for your interest in a career opportunity at Enyata.</p>
//   <p> We have received and we are currently reviewing your application.</p>
//   <p> We thank you for taking the time to explore this opportunity with the Enyata. We encourage you to visit our website at <a href='enyata.com'>enyata.com</a> for additional openings.</p>
//   <br>
//   <p>Enyata Recruitment Team</p>`
  
//   var mailOptions = {
//     from: '"Enyata Academy" <babatundeademola4@gmail.com>',
//     to: 'fatoki.oladele@gmail.com',
//     subject: 'Sending Email using Node.js',
//     html: content
//   };
  
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });


 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJpYXQiOjE1Nzg1ODgwODYsImV4cCI6MTU3ODYxMzI4Nn0.JQjshlpSSF3ZwTjxZTXi2FOsLBl75y4gT4tsUepZXHY