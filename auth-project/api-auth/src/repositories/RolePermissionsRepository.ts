import { prismaClient } from '../lib/prisma';

interface IParams {
  roleId: string;
}

interface IOutput {
  permissionsCodes: string[];
}

export default class RolePermissionsRepository {
  async execute(data: IParams): Promise<IOutput> {
    const rolePermissions = await prismaClient.rolePermission.findMany({
      where: { roleId: data.roleId },
      select: { permissionCode: true },
    });

    return {
      permissionsCodes: rolePermissions.map((item) => item.permissionCode),
    };
  }
}
