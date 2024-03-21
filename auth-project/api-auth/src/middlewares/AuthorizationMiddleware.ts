import { IData, IMiddleware, IResponse } from '../interfaces/IMiddleware';
import { IRequest } from '../interfaces/IRequest';
import RolePermissionsRepository from '../repositories/RolePermissionsRepository';

export interface IOptions {
  operator: 'OR' | 'AND';
}
export default class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredPermissions: string[],
    private readonly rolePermissionsRepository: RolePermissionsRepository,
    private readonly options?: IOptions,
  ) {}

  async handle({ account }: IRequest): Promise<IResponse | IData> {
    if (!account) {
      return {
        statusCode: 403,
        body: {
          error: 'Access denied !',
        },
      };
    }

    const { permissionsCodes } = await this.rolePermissionsRepository.execute({
      roleId: account.role.id,
    });
    const filterFn = this.options?.operator === 'AND' ? 'every' : 'some';
    // eslint-disable-next-line arrow-body-style
    const isAllowed = this.requiredPermissions[filterFn]((permission) => {
      return permissionsCodes.includes(permission);
    });

    if (!isAllowed) {
      return {
        statusCode: 403,
        body: {
          error: 'Access denied !',
        },
      };
    }

    return {
      data: {},
    };
  }
}
