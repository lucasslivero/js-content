import { FastifyInstance } from 'fastify';

import { ListOrdersController } from './controllers/ListOrdersController';
import { RefreshTokenController } from './controllers/RefreshTokenController';
import { SignInController } from './controllers/SignInController';
import { SignUpController } from './controllers/SignUpController';
import { AuthenticationMiddleware } from './middlewares/AuthenticationMiddleware';
import { AuthorizationMiddleware } from './middlewares/AuthorizationMiddleware';

export async function publicRoutes(fastify: FastifyInstance) {
  fastify.post('/signup', SignUpController.handle);
  fastify.post('/signin', SignInController.handle);
  fastify.post('/refresh-token', RefreshTokenController.handle);
}

export async function privateRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', AuthenticationMiddleware);

  fastify.get(
    '/orders',
    {
      onRequest: (req, resp) =>
        AuthorizationMiddleware(req, resp, ['orders:read', 'orders:create'], { operator: 'OR' }),
    },
    ListOrdersController.handle,
  );
  fastify.post(
    '/orders',
    { onRequest: (req, resp) => AuthorizationMiddleware(req, resp, ['orders:create']) },
    ListOrdersController.create,
  );
}
