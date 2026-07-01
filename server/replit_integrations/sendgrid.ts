// SendGrid integration for sending emails
import sgMail from '@sendgrid/mail';

function getCredentials() {
  const apiKey = process.env.SENDGRID_API_KEY;
  const email = process.env.SENDGRID_FROM_EMAIL;

  if (!apiKey || !email) {
    throw new Error('SendGrid is not configured (missing SENDGRID_API_KEY or SENDGRID_FROM_EMAIL)');
  }
  return { apiKey, email };
}

export async function getUncachableSendGridClient() {
  const { apiKey, email } = getCredentials();
  sgMail.setApiKey(apiKey);
  return {
    client: sgMail,
    fromEmail: email
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export async function sendContactFormEmail(data: ContactFormData): Promise<void> {
  const { client, fromEmail } = await getUncachableSendGridClient();
  
  const emailContent = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}

Message:
${data.message}
  `.trim();

  const htmlContent = `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
<h3>Message:</h3>
<p>${data.message.replace(/\n/g, '<br>')}</p>
  `.trim();

  // Send to both info@ithingsolutions.com and test email
  const recipients = ['info@ithingsolutions.com', 'muathith@outlook.com'];
  
  const messages = recipients.map(to => ({
    to,
    from: fromEmail,
    subject: `New Contact Form: ${data.name} - iThing Smart Business Solutions`,
    text: emailContent,
    html: htmlContent,
    replyTo: data.email,
  }));

  await Promise.all(messages.map(msg => client.send(msg)));
}
