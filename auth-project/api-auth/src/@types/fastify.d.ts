import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    metadata?: {
      account?: {
        id: string;
        role: {
          id: string;
          name: string;
        };
      };
    };
  }
}
