import { prisma } from "../config/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  phoneNumber?: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface SendCodeRequest {
  email: string;
}

export class AuthService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Set up email transporter (from API_authSignUpFunction.js)
    this.transporter = nodemailer.createTransporter({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || "noreplyfoodtrack@gmail.com",
        pass: process.env.EMAIL_PASS || "qxse uoyp ghza aesg",
      },
    });
  }

  // From API_authLoginFunction.js - Your existing working logic
  async login(data: LoginRequest) {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    console.log("all users", await prisma.user.findMany());

    const user = await prisma.user.findUnique({
      where: { Email: email },
    });

    console.log("User found:", user);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.Password);

    console.log("Password valid:", isValidPassword);

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        userId: user.Email,
        email: user.Email,
        businessName: user.BusinessName,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    return {
      message: "Login successful",
      token,
      user: {
        email: user.Email,
        businessName: user.BusinessName,
      },
    };
  }

  // From API_authSignUpFunction.js
  async signup(data: SignupRequest) {
    const { email, password, firstName, lastName, businessName, phoneNumber } =
      data;

    // Input validation (from original Lambda)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.length > 50 || !emailRegex.test(email)) {
      throw new Error(
        "Email must be less than or equal to 50 characters and in a valid format."
      );
    }

    if (password.length < 8 || password.length > 100) {
      throw new Error("Password must be between 8 and 100 characters long.");
    }

    const forbiddenChars = [
      "'",
      '"',
      ";",
      "\\",
      "--",
      "/*",
      "*/",
      "=",
      "(",
      ")",
      ">",
      "<",
    ];

    for (let char of forbiddenChars) {
      if (email.includes(char) || password.includes(char)) {
        throw new Error(
          "Email and password should not include forbidden characters: ' \" \\ ; -- /* */ = ( ) < >."
        );
      }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { Email: email },
    });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Hash password (using same logic as original Lambda)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password + email, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        Email: email,
        Password: hashedPassword,
        FirstName: firstName || "User",
        LastName: lastName || "",
        BusinessName: businessName || "Unnamed",
        PhoneNumber: phoneNumber,
      },
    });

    // Send welcome email
    const mailOptions = {
      from: process.env.EMAIL_USER || "noreplyfoodtrack@gmail.com",
      to: email,
      subject: "Welcome!",
      text: "Hello!\n\nThank you for signing up for an account with FoodTrack! We are excited to help you track your finances and inventory.",
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
    } catch (error) {
      console.error("Error sending email:", error);
      // Don't fail signup if email fails
    }

    return {
      message: "User created successfully",
      user: {
        email: user.Email,
        businessName: user.BusinessName,
      },
    };
  }

  // From API_authVerifyCode.js
  async verifyCode(data: VerifyCodeRequest) {
    const { email, code } = data;

    // For now, implement a simple verification
    // In production, you'd store verification codes in a separate table
    const isValidCode = await this.checkVerificationCode(email, code);

    if (!isValidCode) {
      throw new Error("Invalid or expired verification code");
    }

    const user = await prisma.user.findUnique({
      where: { Email: email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign(
      {
        userId: user.Email,
        email: user.Email,
        businessName: user.BusinessName,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    return {
      message: "Email verified successfully",
      token,
      user: {
        email: user.Email,
        businessName: user.BusinessName,
      },
    };
  }

  // From API_sendCode.js
  async sendCode(data: SendCodeRequest) {
    const { email } = data;

    const user = await prisma.user.findUnique({
      where: { Email: email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Store verification code (implement this based on your needs)
    await this.storeVerificationCode(email, verificationCode);

    const mailOptions = {
      from: process.env.EMAIL_USER || "noreplyfoodtrack@gmail.com",
      to: email,
      subject: "Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending verification code:", error);
      throw new Error("Error sending verification code");
    }

    return {
      message: "Verification code sent successfully",
    };
  }

  // From API_authResetPassword.js
  async resetPassword(data: ResetPasswordRequest) {
    const { email, code, newPassword } = data;

    const isValidCode = await this.checkVerificationCode(email, code);
    if (!isValidCode) {
      throw new Error("Invalid or expired reset code");
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword + email, salt);

    await prisma.user.update({
      where: { Email: email },
      data: { Password: hashedPassword },
    });

    await this.removeVerificationCode(email, code);

    return {
      message: "Password reset successfully",
    };
  }

  // From API_validateToken.js
  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      );
      return { valid: true, user: decoded };
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  // From API_getProfileFunction.js
  async getProfile(email: string) {
    const user = await prisma.user.findUnique({
      where: { Email: email },
      select: {
        Email: true,
        FirstName: true,
        LastName: true,
        BusinessName: true,
        PhoneNumber: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  // From API_tokenGenerator.js
  generateToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "24h",
    });
  }

  // Helper methods for verification codes
  private async storeVerificationCode(
    email: string,
    code: string
  ): Promise<void> {
    // Implement based on your verification storage strategy
    // For now, this is a placeholder
    console.log(`Storing verification code ${code} for ${email}`);
  }

  private async checkVerificationCode(
    email: string,
    code: string
  ): Promise<boolean> {
    // Implement verification logic
    // For demo purposes, accept code "123456"
    return code === "123456";
  }

  private async removeVerificationCode(
    email: string,
    code: string
  ): Promise<void> {
    // Implement code removal
    console.log(`Removing verification code ${code} for ${email}`);
  }
}

export const authService = new AuthService();
