import cron from 'node-cron';
import Test from '../models/test.model.js';
import nodemailer from 'nodemailer';
import User from '../models/user.model.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: console,  // Log info to console
  debug: true,
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
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

      console.log("Sending Mail")

      if (user) {
        const emailSubject = 'Your Quizy Test Results';
        const emailBody = `Hello ${user.name},\n\nYour test has been evaluated. Your score is ${calculatedScore} out of 10.\n\nBest regards,\nYour Team`;

        await sendEmail(user.email, emailSubject, emailBody);
      }
    }

    console.log('Test results evaluated successfully.');

  } catch (error) {
    console.log('Error evaluating test results:', error);
  }
};

cron.schedule('* * * * *', evaluateTestResults);
