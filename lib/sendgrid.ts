/**
 * SendGrid Email Service
 * 
 * Note: SendGrid API calls must be made from a backend/serverless function
 * due to CORS restrictions. This file provides the email template and
 * helper functions. You'll need to set up a serverless function (Vercel, Netlify, etc.)
 * or a simple backend endpoint to actually send emails.
 */

export interface MagicLinkEmailData {
    to: string;
    investorName?: string;
    magicLink: string;
}

/**
 * Generate the magic link URL
 */
export function generateMagicLink(token: string): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}/access?token=${token}`;
}

/**
 * Email template for magic link
 */
export function getMagicLinkEmailTemplate(data: MagicLinkEmailData): {
    subject: string;
    html: string;
    text: string;
} {
    const { investorName, magicLink } = data;
    const greeting = investorName ? `Dear ${investorName}` : 'Dear Investor';

    return {
        subject: "Your Exclusive Access to D'Arbonne Gate Investor Portal",
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Georgia, serif; color: #292524; background-color: #f5f5f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; }
          .header { text-align: center; border-bottom: 2px solid #d97706; padding-bottom: 20px; }
          .logo { font-size: 28px; font-weight: bold; color: #0c0a09; }
          .accent { color: #d97706; }
          .content { margin: 30px 0; line-height: 1.6; }
          .cta-button { 
            display: inline-block; 
            background: #d97706; 
            color: white; 
            padding: 15px 40px; 
            text-decoration: none; 
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
          }
          .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #e7e5e4; 
            font-size: 12px; 
            color: #78716c; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">D'ARBONNE <span class="accent">GATE</span></div>
            <p style="color: #78716c; margin-top: 10px;">RV Resort Investment Opportunity</p>
          </div>
          
          <div class="content">
            <p>${greeting},</p>
            
            <p>Welcome to the D'Arbonne Gate Investor Portal. You've been granted exclusive access to our comprehensive investment materials, including:</p>
            
            <ul>
              <li>Live financial projections and USDA/SBA scenarios</li>
              <li>Interactive project timeline and updates</li>
              <li>Market analysis and location intelligence</li>
              <li>Real-time ROI calculator</li>
              <li>Secure document repository</li>
            </ul>
            
            <p>Click the button below to access the portal. This link is valid for 30 days and is unique to you.</p>
            
            <div style="text-align: center;">
              <a href="${magicLink}" class="cta-button">Access Investor Portal</a>
            </div>
            
            <p style="font-size: 14px; color: #78716c; margin-top: 30px;">
              If you have any questions, please don't hesitate to reach out to Cortez Fields directly.
            </p>
          </div>
          
          <div class="footer">
            <p>© 2025 Akerfields LLC. All Rights Reserved.</p>
            <p>This email contains confidential information intended only for the recipient.</p>
          </div>
        </div>
      </body>
      </html>
    `,
        text: `
${greeting},

Welcome to the D'Arbonne Gate Investor Portal. You've been granted exclusive access to our comprehensive investment materials.

Access the portal here: ${magicLink}

This link is valid for 30 days and is unique to you.

If you have any questions, please don't hesitate to reach out to Cortez Fields directly.

© 2025 Akerfields LLC. All Rights Reserved.
    `,
    };
}

/**
 * Send magic link email
 * 
 * This function should be called from a serverless function or backend endpoint.
 * Example implementation for Vercel serverless function:
 * 
 * // api/send-magic-link.ts
 * import sgMail from '@sendgrid/mail';
 * 
 * export default async function handler(req, res) {
 *   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 *   
 *   const { to, investorName, magicLink } = req.body;
 *   const template = getMagicLinkEmailTemplate({ to, investorName, magicLink });
 *   
 *   const msg = {
 *     to,
 *     from: process.env.SENDGRID_FROM_EMAIL,
 *     subject: template.subject,
 *     text: template.text,
 *     html: template.html,
 *   };
 *   
 *   await sgMail.send(msg);
 *   res.status(200).json({ success: true });
 * }
 */
export async function sendMagicLinkEmail(data: MagicLinkEmailData): Promise<void> {
    // This would call your serverless function/backend endpoint
    const endpoint = '/api/send-magic-link'; // You'll need to create this

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to send magic link email');
    }
}
