import { FastifyReply, FastifyRequest } from 'fastify';

import makeRolePermissionsRepository from '../factories/MakeRolePermissionsRepository';
import RolePermissionsRepository from '../repositories/RolePermissionsRepository';

export interface IOptions {
  operator: 'OR' | 'AND';
}
export async function AuthorizationMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
  requiredPermissions: string[],
  options?: IOptions,
) {
  const rolePermissionsRepository: RolePermissionsRepository = makeRolePermissionsRepository();
  const account = request.metadata?.account;
  if (!account) {
    return reply.code(403).send({ error: 'Access denied !' });
  }

  const { permissionsCodes } = await rolePermissionsRepository.execute({
    roleId: account.role.id,
  });
  const filterFn = options?.operator === 'AND' ? 'every' : 'some';
  // eslint-disable-next-line arrow-body-style
  const isAllowed = requiredPermissions[filterFn]((permission) => {
    return permissionsCodes.includes(permission);
  });

  if (!isAllowed) {
    return reply.code(403).send({ error: 'Access denied !' });
  }
}
