import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Tailwind,
} from "@react-email/components";

interface PasswordResetConfirmationProps {
  username: string;
  email: string;
}

export function PasswordResetConfirmation({
  username,
  email,
}: PasswordResetConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Senha redefinida com sucesso!</Preview>

      <Tailwind>
        <Body className="bg-zinc-100 font-sans">
          <Container className="mx-auto max-w-120 rounded-lg bg-white p-6">
            <Heading className="mb-4 text-2xl font-semibold text-zinc-900">
              Confirmação de redefinição de senha!
            </Heading>

            <Text className="text-sm leading-relaxed text-zinc-900">
              Olá <strong>{username}</strong>,
            </Text>

            <Text className="mt-3 text-sm leading-relaxed text-zinc-900">
              A senha de seu email, <strong>{email}</strong> foi redefinida com sucesso!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
