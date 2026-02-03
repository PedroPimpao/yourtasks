import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import "dotenv/config";
import { db } from "./prisma";
import { VerificationEmail } from "../app/_components/emails/verify-email-template";
import { ChangeEmailConfirmation } from "../app/_components/emails/change-email-confirmation";
import { ResetPasswordEmail } from "../app/_components/emails/reset-password-email";
import { sendEmail } from "./send-email";
import { PasswordResetConfirmation } from "../app/_components/emails/password-reset-confirmation";
import { VerifyEmailConfirmed } from "../app/_components/emails/verify-email-confirmed";

const prisma = db;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({ url, newEmail, user }) => {
        try {
          await sendEmail({
            subject: "Confirmar atualização de email",
            react: ChangeEmailConfirmation({
              url,
              newEmail,
              username: user.name,
            }),
          });
          console.log(
            "Email enviado com sucesso (Confirmação de atualização de email)!",
          );
        } catch (error) {
          console.log(
            `Erro ao enviar o email (Confirmação de atualização de email): ${error}`,
          );
        }
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ url, user }) => {
      try {
        await sendEmail({
          subject: "Redefinição de senha",
          react: ResetPasswordEmail({ url, username: user.name }),
        });
        console.log("Email enviado com sucesso (Redefinição de senha)!");
      } catch (error) {
        console.log(`Erro ao enviar o email (Redefinição de senha): ${error}`);
      }
    },
    // Adicionar Error Handler
    onPasswordReset: async ({ user }) => {
      await sendEmail({
        subject: "Senha redefinida com sucesso!",
        react: PasswordResetConfirmation({
          username: user.email,
          email: user.email,
        }),
      });
      console.log(`Senha redefinida para o usuário: ${user.email}`);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ url, user }) => {
      try {
        await sendEmail({
          subject: "Verificação de email",
          react: VerificationEmail({ url, username: user.name }),
        });
        console.log("Email enviado com sucesso (Verificação de email)!");
      } catch (error) {
        console.log("Erro ao enviar o email (Verificação de email):", error);
      }
    },
    // Adicionar Error Handler
    onEmailVerification: async ({ name, email }) => {
      await sendEmail({
        subject: "Email verificado com sucesso!",
        react: VerifyEmailConfirmed({ username: name, email }),
      });
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
