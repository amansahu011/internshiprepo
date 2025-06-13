// require('dotenv').config();
// const express = require('express');
// const nodemailer = require('nodemailer');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // MySQL connection
// const db = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE
// });

// db.connect((err) => {
//   if (err) {
//     console.error('❌ MySQL connection failed:', err);
//     return;
//   }
//   console.log("✅ MySQL working");
// });

// // GET: Show email input form (admin page)
// app.get('/', (req, res) => {
//   res.render('email_form'); // views/email_form.ejs
// });

// // POST: Send invitation email
// app.post('/send-invite', (req, res) => {
//   const userEmail = req.body.email;

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.ADMIN_EMAIL,
//       pass: process.env.APP_PASSWORD
//     }
//   });

//   const mailOptions = {
//     from: process.env.ADMIN_EMAIL,
//     to: userEmail,
//     subject: 'You are invited!',
//     html: `
//       <p>Hello,</p>
//       <p>You have been invited. Click the link below to register:</p>
//       <a href="http://localhost:${PORT}/register?email=${encodeURIComponent(userEmail)}">Register Here</a>
//     `
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       return res.send('❌ Failed to send invitation email.');
//     }
//     console.log('📧 Email sent:', info.response);
//     res.send(`✅ Invitation email sent to ${userEmail}`);
//   });
// });

// // GET: Serve registration form
// app.get('/register', (req, res) => {
//   const email = req.query.email || '';
//   res.render('register', { email }); // views/register.ejs
// });

// // POST: Handle registration form submit
// app.post('/register', (req, res) => {
//   const { name, email, phone } = req.body;

//   const query = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
//   db.query(query, [name, email, phone], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.send('❌ Failed to register.');
//     }
//     res.send('✅ Registered successfully!');
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });






require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    return;
  }
  console.log("✅ MySQL working");
});

// GET: Show email input form (admin page)
app.get('/', (req, res) => {
  res.render('email_form'); // views/email_form.ejs
});

// POST: Send invitation email (with email verification)
app.post('/send-invite', async (req, res) => {
  const userEmail = req.body.email;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userEmail)) {
    return res.send(`<h2 style="color:red;">❌ Invalid email format.</h2>`);
  }

  // Verify email using MailboxLayer API
  try {
    const response = await axios.get('http://apilayer.net/api/check', {
      params: {
        access_key: process.env.EMAIL_VERIFICATION_API_KEY,
        email: userEmail
      }
    });

    const result = response.data;

    if (!result.format_valid || !result.smtp_check) {
      return res.send(`<h2 style="color:red;">❌ This email does not exist or is undeliverable.</h2>`);
    }

    // If valid, send invitation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.APP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: userEmail,
      subject: 'You are invited!',
      html: `
        <p>Hello,</p>
        <p>You have been invited. Click the link below to register:</p>
        <a href="http://localhost:${PORT}/register?email=${encodeURIComponent(userEmail)}">Register Here</a>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Email sending error:', error.message);
        return res.send(`<h2 style="color:red;">❌ Failed to send invitation email.</h2>`);
      }

      console.log('📧 Email sent:', info.response);
      res.send(`<h2 style="color:green;">✅ Invitation sent successfully to ${userEmail}</h2>`);
    });
  } catch (error) {
    console.error('📛 API verification error:', error.message);
    res.send(`<h2 style="color:red;">❌ Failed to verify email. Please try again later.</h2>`);
  }
});

// GET: Serve registration form
app.get('/register', (req, res) => {
  const email = req.query.email || '';
  res.render('register', { email }); // views/register.ejs
});

// POST: Handle registration form submit
app.post('/register', (req, res) => {
  const { name, email, phone } = req.body;

  const query = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
  db.query(query, [name, email, phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.send('<h2 style="color:red;">❌ Failed to register.</h2>');
    }
    res.send('<h2 style="color:green;">✅ Registered successfully!</h2>');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
