import cron from 'node-cron';
import Test from '../models/test.model.js';
import nodemailer from 'nodemailer';
import User from '../models/user.model.js';
import dotenv from 'dotenv'
dotenv.config()

const emailId = process.env.SERVER_MAIL_USER
const emailPass = process.env.SERVER_MAIL_PASS


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: emailId,
    pass: emailPass,
  }
});

const sendEmail = async (toUser, mailSubject, mailHtml) => {
  try {

    await transporter.sendMail({
      from: emailId,
      to: toUser,
      subject: mailSubject,
      html: mailHtml,
    });

    console.log(`Email sent to ${toUser}`);
  } catch (error) {
    console.error(`Error sending email to ${toUser}:`, error);
  }
};


const evaluateTestResults = async () => {
  try {
    const tests = await Test.find({ evaluated: false });

    for (const test of tests) {
      const calculatedScore = test.questions.reduce((acc, question) => {
        return acc + (question.selectedAnswer === question.correctAnswer ? 1 : 0);
      }, 0);

      test.evaluated = true;
      test.score = calculatedScore;

      await test.save();

      const user = await User.findById(test.userId);

      console.log("Sending Mail to ", user.email)

      if (user) {
        const emailSubject = 'Your Quizy Test Results';
        const emailBody = `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333333;
        padding: 20px;
      }
      .email-container {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        max-width: 600px;
        margin: auto;
      }
      .email-header {
        background-color: #4CAF50;
        color: white;
        padding: 20px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        text-align: center;
      }
      .email-header h1 {
        margin: 0;
        font-size: 24px;
      }
      .email-body {
        padding: 20px;
        font-size: 16px;
        line-height: 1.5;
      }
      .email-body p {
        margin: 0 0 10px;
      }
      .email-footer {
        margin-top: 20px;
        text-align: center;
        color: #888888;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>Quizy Test Results</h1>
      </div>
      <div class="email-body">
        <p>Hello ${user.fullname},</p>
        <p>Your test has been evaluated and we are excited to share your results with you!</p>
        <p><strong>Your score is ${calculatedScore} out of 10.</strong></p>
        <p>Keep up the great work and continue to challenge yourself with more quizzes on Quizy.</p>
        <p>Best regards,</p>
        <p>The Quizy Team</p>
      </div>
      <div class="email-footer">
        <p>&copy; ${new Date().getFullYear()} Quizy. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
`;

        await sendEmail(user.email, emailSubject, emailBody);
      }
    }

    console.log('Test results evaluated successfully.');

  } catch (error) {
    console.log('Error evaluating test results:', error);
  }
};

cron.schedule('0 * * * *', evaluateTestResults);
