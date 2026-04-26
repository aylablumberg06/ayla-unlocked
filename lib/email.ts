import nodemailer from 'nodemailer'

/**
 * Gmail SMTP transport using a Google App Password.
 * Used for contact form notifications + certificate delivery.
 *
 * GMAIL_USER + GMAIL_APP_PASSWORD must be set in env. The app password is
 * a 16-char value generated at myaccount.google.com/apppasswords; spaces
 * are optional, Google strips them.
 */
let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporter) return transporter
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, ''),
    },
  })
  return transporter
}

type SendArgs = {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: SendArgs) {
  const from = `Ayla Unlocked <${process.env.GMAIL_USER}>`
  const info = await getTransporter().sendMail({
    from,
    to: Array.isArray(to) ? to.join(', ') : to,
    subject,
    html,
    replyTo,
  })
  return { id: info.messageId }
}
