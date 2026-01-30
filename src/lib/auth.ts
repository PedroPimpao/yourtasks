import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import "dotenv/config";
import { db } from "./prisma";
import { Resend } from "resend";

const prisma = db;
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  user: {
    deleteUser: {
      enabled: true
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ url }) => {
      try {
        await resend.emails.send({
          from: `${process.env.EMAIL_SENDER_ADDRESS}`,
          // to: [`${user.email}`]
          to: [`${process.env.EMAIL_DEVELOPER_ADDRESS}`],
          subject: "Redefinição de senha",
          text: `Clique no link resetar sua senha: ${url}`,
        });
        console.log("Email enviado com sucesso (Redefinição de senha)!");
      } catch (error) {
        console.log(`Erro ao enviar o email (Redefinição de senha): ${error}`);
      }
    },
    onPasswordReset: async ({ user }) => {
      console.log(`Senha redefinida para o usuário: ${user.email}`);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ url }) => {
      try {
        await resend.emails.send({
          from: `${process.env.EMAIL_SENDER_ADDRESS}`,
          // to: [`${user.email}`]
          to: [`${process.env.EMAIL_DEVELOPER_ADDRESS}`],
          subject: "Verificação de email",
          text: `Clique no link para verificar o Email: ${url}`,
        });
        console.log("Email enviado com sucesso (Verificação de email)!");
      } catch (error) {
        console.log("Erro ao enviar o email (Verificação de email):", error);
      }
    },
    onEmailVerification: async ({ email }) => {
      console.log(`Email verificado para o usuário: ${email}`);
    },
    sendOnSignUp: true,
    // sendOnSignIn: true,
    // autoSignInAfterVerification: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
});
