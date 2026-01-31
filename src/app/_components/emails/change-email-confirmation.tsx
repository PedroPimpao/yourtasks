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

interface ChangeEmailConfirmation {
  username: string;
  newEmail: string
  url: string;
}

export function ChangeEmailConfirmation({ username, newEmail, url }: ChangeEmailConfirmation) {
  return (
    <Html>
      <Head />
      <Preview>Confirmação de alteração de email!</Preview>

      <Tailwind>
        <Body className="bg-zinc-100 font-sans">
          <Container className="mx-auto max-w-120 rounded-lg bg-white p-6">
            <Heading className="mb-4 text-2xl font-semibold text-zinc-900">
              Alteração de email
            </Heading>

            <Text className="text-sm leading-relaxed text-zinc-900">
              Olá <strong>{username}</strong>,
            </Text>

            <Text className="mt-3 text-sm leading-relaxed text-zinc-900">
              Deseja refefinir o email para <strong>{newEmail}</strong>? Se sim, confirme clicando no botão abaixo
            </Text>

            <Section className="my-6 text-center">
              <Button
                href={url}
                className="rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white no-underline"
              >
                Confirmar alteração
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
