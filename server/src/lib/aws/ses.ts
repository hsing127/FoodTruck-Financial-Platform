import { ses, SES_CONFIG } from "../../config/aws";
import { EmailTemplate } from "../../types";

export class SESService {
  private fromEmail: string;

  constructor() {
    this.fromEmail = SES_CONFIG.fromEmail;
  }

  /**
   * Send email using SES
   */
  async sendEmail(emailData: EmailTemplate): Promise<string> {
    try {
      const params = {
        Source: this.fromEmail,
        Destination: {
          ToAddresses: [emailData.to],
        },
        Message: {
          Subject: {
            Data: emailData.subject,
            Charset: SES_CONFIG.charset,
          },
          Body: {
            Html: {
              Data: emailData.html,
              Charset: SES_CONFIG.charset,
            },
            Text: emailData.text
              ? {
                  Data: emailData.text,
                  Charset: SES_CONFIG.charset,
                }
              : undefined,
          },
        },
      };

      const result = await ses.sendEmail(params).promise();
      return result.MessageId;
    } catch (error) {
      console.error("SES send email error:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  /**
   * Send verification code email
   */
  async sendVerificationCode(
    email: string,
    code: string,
    firstName?: string
  ): Promise<string> {
    const subject = "Email Verification - FoodTruck Financial Platform";
    const html = this.generateVerificationEmailHTML(code, firstName);
    const text = this.generateVerificationEmailText(code, firstName);

    return this.sendEmail({ to: email, subject, html, text });
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(
    email: string,
    resetToken: string,
    firstName?: string
  ): Promise<string> {
    const subject = "Password Reset - FoodTruck Financial Platform";
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const html = this.generatePasswordResetEmailHTML(resetUrl, firstName);
    const text = this.generatePasswordResetEmailText(resetUrl, firstName);

    return this.sendEmail({ to: email, subject, html, text });
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(email: string, firstName: string): Promise<string> {
    const subject = "Welcome to FoodTruck Financial Platform!";
    const html = this.generateWelcomeEmailHTML(firstName);
    const text = this.generateWelcomeEmailText(firstName);

    return this.sendEmail({ to: email, subject, html, text });
  }

  /**
   * Send receipt processed notification
   */
  async sendReceiptProcessedEmail(
    email: string,
    fileName: string,
    extractedData: any,
    firstName?: string
  ): Promise<string> {
    const subject = "Receipt Processed - FoodTruck Financial Platform";
    const html = this.generateReceiptProcessedEmailHTML(
      fileName,
      extractedData,
      firstName
    );
    const text = this.generateReceiptProcessedEmailText(
      fileName,
      extractedData,
      firstName
    );

    return this.sendEmail({ to: email, subject, html, text });
  }

  /**
   * Send low inventory alert
   */
  async sendLowInventoryAlert(
    email: string,
    items: Array<{ name: string; currentStock: number; minimumStock: number }>,
    firstName?: string
  ): Promise<string> {
    const subject = "Low Inventory Alert - FoodTruck Financial Platform";
    const html = this.generateLowInventoryEmailHTML(items, firstName);
    const text = this.generateLowInventoryEmailText(items, firstName);

    return this.sendEmail({ to: email, subject, html, text });
  }

  /**
   * Verify email address with SES
   */
  async verifyEmailAddress(email: string): Promise<void> {
    try {
      await ses.verifyEmailIdentity({ EmailAddress: email }).promise();
    } catch (error) {
      console.error("SES verify email error:", error);
      throw new Error(`Failed to verify email address: ${error.message}`);
    }
  }

  /**
   * Get sending statistics
   */
  async getSendingStatistics(): Promise<any> {
    try {
      const result = await ses.getSendStatistics().promise();
      return result.SendDataPoints;
    } catch (error) {
      console.error("SES get statistics error:", error);
      throw new Error(`Failed to get sending statistics: ${error.message}`);
    }
  }

  /**
   * Check if sending is enabled
   */
  async isSendingEnabled(): Promise<boolean> {
    try {
      const result = await ses.getAccountSendingEnabled().promise();
      return result.Enabled || false;
    } catch (error) {
      console.error("SES check sending enabled error:", error);
      return false;
    }
  }

  // Email template generators
  private generateVerificationEmailHTML(
    code: string,
    firstName?: string
  ): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Email Verification</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .code { font-size: 24px; font-weight: bold; color: #2563eb; text-align: center; margin: 20px 0; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Email Verification</h1>
          </div>
          <div class="content">
            <p>Hello ${firstName || "there"},</p>
            <p>Please verify your email address by entering the following code:</p>
            <div class="code">${code}</div>
            <p>This code will expire in 15 minutes.</p>
            <p>If you didn't create an account with FoodTruck Financial Platform, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 FoodTruck Financial Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateVerificationEmailText(
    code: string,
    firstName?: string
  ): string {
    return `
Hello ${firstName || "there"},

Please verify your email address by entering the following code: ${code}

This code will expire in 15 minutes.

If you didn't create an account with FoodTruck Financial Platform, please ignore this email.

FoodTruck Financial Platform
    `;
  }

  private generatePasswordResetEmailHTML(
    resetUrl: string,
    firstName?: string
  ): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .button { display: inline-block; padding: 12px 24px; background: #dc2626; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset</h1>
          </div>
          <div class="content">
            <p>Hello ${firstName || "there"},</p>
            <p>You requested a password reset for your FoodTruck Financial Platform account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p>${resetUrl}</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request a password reset, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 FoodTruck Financial Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generatePasswordResetEmailText(
    resetUrl: string,
    firstName?: string
  ): string {
    return `
Hello ${firstName || "there"},

You requested a password reset for your FoodTruck Financial Platform account.

Reset your password by visiting: ${resetUrl}

This link will expire in 1 hour.

If you didn't request a password reset, please ignore this email.

FoodTruck Financial Platform
    `;
  }

  private generateWelcomeEmailHTML(firstName: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to FoodTruck Financial Platform!</h1>
          </div>
          <div class="content">
            <p>Hello ${firstName},</p>
            <p>Welcome to FoodTruck Financial Platform! We're excited to help you manage your food truck business finances.</p>
            <p>Here's what you can do with your account:</p>
            <ul>
              <li>Track sales and revenue</li>
              <li>Manage inventory</li>
              <li>Process receipts with OCR</li>
              <li>Generate financial reports</li>
              <li>Monitor expenses and purchases</li>
            </ul>
            <p>Get started by logging into your dashboard and exploring the features.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 FoodTruck Financial Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateWelcomeEmailText(firstName: string): string {
    return `
Hello ${firstName},

Welcome to FoodTruck Financial Platform! We're excited to help you manage your food truck business finances.

Here's what you can do with your account:
- Track sales and revenue
- Manage inventory
- Process receipts with OCR
- Generate financial reports
- Monitor expenses and purchases

Get started by logging into your dashboard and exploring the features.

FoodTruck Financial Platform
    `;
  }

  private generateReceiptProcessedEmailHTML(
    fileName: string,
    extractedData: any,
    firstName?: string
  ): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Receipt Processed</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #8b5cf6; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Receipt Processed</h1>
          </div>
          <div class="content">
            <p>Hello ${firstName || "there"},</p>
            <p>Your receipt "${fileName}" has been successfully processed.</p>
            ${
              extractedData.vendor
                ? `<p><strong>Vendor:</strong> ${extractedData.vendor}</p>`
                : ""
            }
            ${
              extractedData.total
                ? `<p><strong>Total:</strong> $${extractedData.total}</p>`
                : ""
            }
            ${
              extractedData.date
                ? `<p><strong>Date:</strong> ${new Date(
                    extractedData.date
                  ).toLocaleDateString()}</p>`
                : ""
            }
            <p>The data has been automatically added to your records.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 FoodTruck Financial Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateReceiptProcessedEmailText(
    fileName: string,
    extractedData: any,
    firstName?: string
  ): string {
    return `
Hello ${firstName || "there"},

Your receipt "${fileName}" has been successfully processed.

${extractedData.vendor ? `Vendor: ${extractedData.vendor}` : ""}
${extractedData.total ? `Total: $${extractedData.total}` : ""}
${
  extractedData.date
    ? `Date: ${new Date(extractedData.date).toLocaleDateString()}`
    : ""
}

The data has been automatically added to your records.

FoodTruck Financial Platform
    `;
  }

  private generateLowInventoryEmailHTML(
    items: Array<{ name: string; currentStock: number; minimumStock: number }>,
    firstName?: string
  ): string {
    const itemsList = items
      .map(
        (item) =>
          `<li>${item.name}: ${item.currentStock} remaining (minimum: ${item.minimumStock})</li>`
      )
      .join("");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Low Inventory Alert</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f59e0b; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Low Inventory Alert</h1>
          </div>
          <div class="content">
            <p>Hello ${firstName || "there"},</p>
            <p>The following items are running low in your inventory:</p>
            <ul>${itemsList}</ul>
            <p>Consider restocking these items to avoid running out.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 FoodTruck Financial Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateLowInventoryEmailText(
    items: Array<{ name: string; currentStock: number; minimumStock: number }>,
    firstName?: string
  ): string {
    const itemsList = items
      .map(
        (item) =>
          `- ${item.name}: ${item.currentStock} remaining (minimum: ${item.minimumStock})`
      )
      .join("\n");

    return `
Hello ${firstName || "there"},

The following items are running low in your inventory:

${itemsList}

Consider restocking these items to avoid running out.

FoodTruck Financial Platform
    `;
  }
}

export default new SESService();
