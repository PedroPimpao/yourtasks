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

interface VerificationEmailProps {
  username: string;
  url: string;
}

export function VerificationEmail({
  username,
  url,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirme seu email!</Preview>

      <Tailwind>
        <Body className="bg-zinc-100 font-sans">
          <Container className="mx-auto max-w-120 rounded-lg bg-white p-6">
            <Heading className="mb-4 text-2xl font-semibold text-zinc-900">
              Verificação de email
            </Heading>

            <Text className="text-sm leading-relaxed text-zinc-900">
              Olá <strong>{username}</strong>,
            </Text>

            <Text className="mt-3 text-sm leading-relaxed text-zinc-900">
              Obrigado por se cadastrar! Para finalizar o processo, confirme seu
              endereço de email clicando no botão abaixo.
            </Text>

            <Section className="my-6 text-center">
              <Button
                href={url}
                className="rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white no-underline"
              >
                Verificar email
              </Button>
            </Section>

            <Text className="text-xs text-zinc-500">
              Se você não criou essa conta, pode ignorar este email com
              segurança.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
