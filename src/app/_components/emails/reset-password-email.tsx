import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  username: string;
  url: string;
}

export function ResetPasswordEmail({ username, url }: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Redefina sua senha!</Preview>

      <Tailwind>
        <Body className="bg-zinc-100 font-sans">
          <Container className="mx-auto max-w-120 rounded-lg bg-white p-6">
            <Heading className="mb-4 text-2xl font-semibold text-zinc-900">
              Redefina sua senha
            </Heading>

            <Text className="text-sm leading-relaxed text-zinc-900">
              Olá <strong>{username}</strong>,
            </Text>

            <Text className="mt-3 text-sm leading-relaxed text-zinc-900">
              Para seguir o processo, clique no botão abaixo para ser
              redirecionado para redefinir a senha.
            </Text>

            <Section className="my-6 text-center">
              <Button
                href={url}
                className="rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white no-underline"
              >
                Redefinir senha
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
