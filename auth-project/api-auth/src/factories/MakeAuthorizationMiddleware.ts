import AuthorizationMiddleware, { IOptions } from '../middlewares/AuthorizationMiddleware';

import makeRolePermissionsRepository from './MakeRolePermissionsRepository';

export default function makeAuthorizationMiddleware(requiredRoles: string[], options?: IOptions) {
  return new AuthorizationMiddleware(requiredRoles, makeRolePermissionsRepository(), options);
}
