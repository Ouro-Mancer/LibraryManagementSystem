export function generateVerificationOtpEmailTemplate(otpcode) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9; text-align: center;">
        
        <h2 style="color: #333;">🔐 Verify Your Email Address</h2>
  
        <p style="font-size: 16px; color: #555;">Dear User,</p>
        <p style="font-size: 16px; color: #555;">
          To complete your registration or login, please use the following OTP to verify your email address:
        </p>
  
        <div style="margin: 20px auto; padding: 15px; font-size: 24px; font-weight: bold; color: #fff; background-color: #007bff; display: inline-block; border-radius: 5px;">
          ${otpcode}
        </div>
  
        <p style="font-size: 14px; color: #888;">
          This code is valid for <strong>15 minutes</strong>. Please do not share this code with anyone.
        </p>
  
        <p style="font-size: 14px; color: #888;">
          If you did not request this code, you can safely ignore this email.
        </p>
  
        <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0;">
  
        <footer>
          <p style="font-size: 12px; color: #999;">Thank you for using our service.</p>
        </footer>
  
      </div>
    `;
  }
  