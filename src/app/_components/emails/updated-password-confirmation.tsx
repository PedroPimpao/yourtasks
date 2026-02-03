// Email para confirmar ao usuário sobre a atualização de senha

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

interface UpdatedPasswordConfirmationProps {
  username: string;
  email: string;
}

export function UpdatedPasswordConfirmation({
  username,
  email,
}: UpdatedPasswordConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Senha alterada com sucesso!</Preview>

      <Tailwind>
        <Body className="bg-zinc-100 font-sans">
          <Container className="mx-auto max-w-120 rounded-lg bg-white p-6">
            <Heading className="mb-4 text-2xl font-semibold text-zinc-900">
              Alteração de senha
            </Heading>

            <Text className="text-sm leading-relaxed text-zinc-900">
              Olá <strong>{username}</strong>,
            </Text>

            <Text className="mt-3 text-sm leading-relaxed text-zinc-900">
              A senha do seu perfil no YourTasks cadastrado com o email <strong>{email}</strong> foi redefinida com sucesso!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
