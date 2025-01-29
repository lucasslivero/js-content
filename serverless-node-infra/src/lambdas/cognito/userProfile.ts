import { AdminGetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from '@libs/cognitoClient';
import { response } from '@utils/response';
import { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
  const userId = event.requestContext.authorizer.jwt.claims.sub as string;

  const command = new AdminGetUserCommand({
    Username: userId,
    UserPoolId: process.env.COGNITO_POOL_ID,
  });

  const { UserAttributes } = await cognitoClient.send(command);

  const profile = UserAttributes?.reduce((profileObj, { Name, Value }) => {
    const keyMap = {
      given_name: 'firstName',
      family_name: 'lastName',
      sub: 'id',
    };
    return {
      ...profileObj,
      [keyMap[Name as keyof typeof keyMap] ?? Name]: Value,
    };
  }, {});

  return response(200, { profile });
}
