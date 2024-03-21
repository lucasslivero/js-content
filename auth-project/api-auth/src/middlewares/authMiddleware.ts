import { FastifyReply, FastifyRequest } from 'fastify';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
    return reply;
  } catch {
    return reply.code(401).send({ error: 'Invalid credentials' });
  }
}
