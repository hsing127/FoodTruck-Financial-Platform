import { EmailTemplate, VerificationCode } from "../types";
import {
  generateVerificationCode,
  generatePasswordResetToken,
} from "../utils/auth";
import SESService from "../lib/aws/ses";
import { prisma } from "../config/database";

export class EmailService {
  /**
   * Send verification code email
   */
  async sendVerificationCode(
    userId: string,
    email: string,
    firstName?: string
  ): Promise<void> {
    try {
      // Generate verification code
      const code = generateVerificationCode();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      // Save to database
      await prisma.verificationCode.create({
        data: {
          userId,
          code,
          type: "email_verification",
          expiresAt,
          isUsed: false,
        },
      });

      // Send email
      await SESService.sendVerificationCode(email, code, firstName);
    } catch (error) {
      console.error("Send verification code error:", error);
      throw new Error(`Failed to send verification code: ${error.message}`);
    }
  }

  /**
   * Verify email code
   */
  async verifyEmailCode(userId: string, code: string): Promise<boolean> {
    try {
      const verificationCode = await prisma.verificationCode.findFirst({
        where: {
          userId,
          code,
          type: "email_verification",
          isUsed: false,
          expiresAt: {
            gt: new Date(),
          },
        },
      });

      if (!verificationCode) {
        return false;
      }

      // Mark as used
      await prisma.verificationCode.update({
        where: { id: verificationCode.id },
        data: { isUsed: true },
      });

      // Update user as verified
      await prisma.user.update({
        where: { id: userId },
        data: { isVerified: true },
      });

      return true;
    } catch (error) {
      console.error("Verify email code error:", error);
      throw new Error(`Failed to verify email code: ${error.message}`);
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Don't reveal if email exists or not
        return;
      }

      // Generate reset token
      const resetToken = generatePasswordResetToken(user.id);
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Save to database
      await prisma.verificationCode.create({
        data: {
          userId: user.id,
          code: resetToken,
          type: "password_reset",
          expiresAt,
          isUsed: false,
        },
      });

      // Send email
      await SESService.sendPasswordResetEmail(
        email,
        resetToken,
        user.firstName
      );
    } catch (error) {
      console.error("Send password reset email error:", error);
      throw new Error(`Failed to send password reset email: ${error.message}`);
    }
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(userId: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      await SESService.sendWelcomeEmail(user.email, user.firstName);
    } catch (error) {
      console.error("Send welcome email error:", error);
      throw new Error(`Failed to send welcome email: ${error.message}`);
    }
  }

  /**
   * Send receipt processed notification
   */
  async sendReceiptProcessedNotification(
    userId: string,
    fileName: string,
    extractedData: any
  ): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      await SESService.sendReceiptProcessedEmail(
        user.email,
        fileName,
        extractedData,
        user.firstName
      );
    } catch (error) {
      console.error("Send receipt processed notification error:", error);
      throw new Error(
        `Failed to send receipt processed notification: ${error.message}`
      );
    }
  }

  /**
   * Send low inventory alert
   */
  async sendLowInventoryAlert(
    userId: string,
    items: Array<{ name: string; currentStock: number; minimumStock: number }>
  ): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      await SESService.sendLowInventoryAlert(user.email, items, user.firstName);
    } catch (error) {
      console.error("Send low inventory alert error:", error);
      throw new Error(`Failed to send low inventory alert: ${error.message}`);
    }
  }

  /**
   * Send custom email
   */
  async sendCustomEmail(emailData: EmailTemplate): Promise<string> {
    try {
      return await SESService.sendEmail(emailData);
    } catch (error) {
      console.error("Send custom email error:", error);
      throw new Error(`Failed to send custom email: ${error.message}`);
    }
  }

  /**
   * Resend verification code
   */
  async resendVerificationCode(userId: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (user.isVerified) {
        throw new Error("User is already verified");
      }

      // Invalidate existing codes
      await prisma.verificationCode.updateMany({
        where: {
          userId,
          type: "email_verification",
          isUsed: false,
        },
        data: { isUsed: true },
      });

      // Send new verification code
      await this.sendVerificationCode(userId, user.email, user.firstName);
    } catch (error) {
      console.error("Resend verification code error:", error);
      throw new Error(`Failed to resend verification code: ${error.message}`);
    }
  }

  /**
   * Clean up expired verification codes
   */
  async cleanupExpiredCodes(): Promise<number> {
    try {
      const result = await prisma.verificationCode.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      return result.count;
    } catch (error) {
      console.error("Cleanup expired codes error:", error);
      throw new Error(`Failed to cleanup expired codes: ${error.message}`);
    }
  }

  /**
   * Get email statistics
   */
  async getEmailStatistics(userId: string): Promise<{
    totalSent: number;
    verificationsSent: number;
    passwordResetsSent: number;
    lastEmailSent?: Date;
  }> {
    try {
      const verificationCodes = await prisma.verificationCode.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      const totalSent = verificationCodes.length;
      const verificationsSent = verificationCodes.filter(
        (code) => code.type === "email_verification"
      ).length;
      const passwordResetsSent = verificationCodes.filter(
        (code) => code.type === "password_reset"
      ).length;
      const lastEmailSent = verificationCodes[0]?.createdAt;

      return {
        totalSent,
        verificationsSent,
        passwordResetsSent,
        lastEmailSent,
      };
    } catch (error) {
      console.error("Get email statistics error:", error);
      throw new Error(`Failed to get email statistics: ${error.message}`);
    }
  }

  /**
   * Check if user can receive more emails (rate limiting)
   */
  async canSendEmail(userId: string, emailType: string): Promise<boolean> {
    try {
      const recentCodes = await prisma.verificationCode.findMany({
        where: {
          userId,
          type: emailType as any,
          createdAt: {
            gt: new Date(Date.now() - 5 * 60 * 1000), // Last 5 minutes
          },
        },
      });

      // Allow maximum 3 emails of same type per 5 minutes
      return recentCodes.length < 3;
    } catch (error) {
      console.error("Check email rate limit error:", error);
      return false;
    }
  }

  /**
   * Validate verification code format
   */
  validateCodeFormat(code: string): boolean {
    return /^\d{6}$/.test(code);
  }

  /**
   * Generate email preview (for testing)
   */
  async generateEmailPreview(
    type: "verification" | "password_reset" | "welcome",
    data: any
  ): Promise<{ subject: string; html: string; text: string }> {
    try {
      switch (type) {
        case "verification":
          return {
            subject: "Email Verification - FoodTruck Financial Platform",
            html: "Preview of verification email...",
            text: "Preview of verification email text...",
          };
        case "password_reset":
          return {
            subject: "Password Reset - FoodTruck Financial Platform",
            html: "Preview of password reset email...",
            text: "Preview of password reset email text...",
          };
        case "welcome":
          return {
            subject: "Welcome to FoodTruck Financial Platform!",
            html: "Preview of welcome email...",
            text: "Preview of welcome email text...",
          };
        default:
          throw new Error("Unknown email type");
      }
    } catch (error) {
      console.error("Generate email preview error:", error);
      throw new Error(`Failed to generate email preview: ${error.message}`);
    }
  }
}

export default new EmailService();
