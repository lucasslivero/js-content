import { FastifyReply, FastifyRequest } from 'fastify';

export interface IOptions {
  sub: string;
  role: {
    name: string;
    id: string;
  };
}
export async function AuthenticationMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const jwt: IOptions = await request.jwtVerify();
    request.metadata = {
      account: {
        id: jwt.sub,
        role: jwt.role,
      },
    };
  } catch {
    return reply.code(401).send({ error: 'Invalid credentials' });
  }
}
