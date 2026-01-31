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

interface VerifyEmailConfirmedProps {
  username: string;
  email: string;
}

export function VerifyEmailConfirmed({
  username,
  email,
}: VerifyEmailConfirmedProps) {
  return (
    <Html>
      <Head />
      <Preview>Email verificado com sucesso!</Preview>

      <Tailwind>
        <Body className="bg-zinc-100 font-sans">
          <Container className="mx-auto max-w-120 rounded-lg bg-white p-6">
            <Heading className="mb-4 text-2xl font-semibold text-zinc-900">
              Confirmação de verificação de email
            </Heading>

            <Text className="text-sm leading-relaxed text-zinc-900">
              Olá <strong>{username}</strong>,
            </Text>

            <Text className="mt-3 text-sm leading-relaxed text-zinc-900">
              Seu email, <strong>{email}</strong> foi verificado com sucesso!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
