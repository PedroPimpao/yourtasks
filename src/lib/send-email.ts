"use server";

import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
    subject: string
    react?: React.ReactNode
}

export const sendEmail = async ({ subject, react } : SendEmailProps) => {
  await resend.emails.send({
    from: `${process.env.EMAIL_SENDER_ADDRESS}`,
    // to: [`${user.email}`]
    to: [`${process.env.EMAIL_DEVELOPER_ADDRESS}`],
    subject,
    react,
  });
};
