

const emailFormat = ({ fullname, calculatedScore }) => `
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
        <p>Hello ${fullname},</p>
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

export default emailFormat
