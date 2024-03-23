import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { IOrdersDTO } from '../interfaces/IOrders';
import { orders } from '../lib/db';
import { OrdersRepository } from '../repositories/OrdersRepository';

export class ListOrdersController {
  static schema: z.ZodType<IOrdersDTO> = z.object({
    name: z.string().min(1),
    price: z.number().positive(),
  });

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({
      orders,
    });
  }

  static async create(request: FastifyRequest, reply: FastifyReply) {
    const result = ListOrdersController.schema.safeParse(request.body);

    if (!result.success) {
      return reply.code(400).send({ errors: result.error.issues });
    }

    const order = await OrdersRepository.create(result.data);
    return reply.code(201).send({
      order,
    });
  }
}
