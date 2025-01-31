import type { CustomMessageTriggerEvent } from 'aws-lambda';

export async function handler(
  event: CustomMessageTriggerEvent,
): Promise<CustomMessageTriggerEvent> {
  const name = event.request.userAttributes.given_name;
  const { email } = event.request.userAttributes;
  const code = event.request.codeParameter;

  const resp = event;

  if (event.triggerSource === 'CustomMessage_SignUp') {
    resp.response.emailSubject = `Bem-vindo(a) ${name}!`;
    resp.response.emailMessage = `<h1>Seja muito Bem-vindo(a) ${name}</h1> <br /><br /> Use este código para comfirmar sua conta: ${code}`;
  }

  if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    resp.response.emailSubject = 'Recuperação de conta';
    resp.response.emailMessage = `<h1>Para recuperar a sua conta acesse:</h1> <strong>https://app.cognitosystem.com.br/recuperar?email=${encodeURIComponent(email)}&code=${code}</strong>`;
  }
  return resp;
}
