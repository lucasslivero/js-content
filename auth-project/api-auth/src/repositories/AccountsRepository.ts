import { Account } from '@prisma/client';

import { prismaClient } from '../lib/prisma';

interface ICreateDTO {
  email: string;
  password: string;
  name: string;
  roleId: string;
}

export class AccountsRepository {
  static async findByEmail(email: string) {
    const account = await prismaClient.account.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });

    return account;
  }

  static async create({ email, name, password, roleId }: ICreateDTO): Promise<Account> {
    return prismaClient.account.create({
      data: {
        email,
        name,
        password,
        roleId,
      },
    });
  }
}
