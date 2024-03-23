import crypto from 'node:crypto';

import { IOrdersDTO } from '../interfaces/IOrders';
import { orders } from '../lib/db';
import { zeroPad } from '../utils/zeroPad';

export class OrdersRepository {
  static async create({ name, price }: IOrdersDTO) {
    const order = {
      id: crypto.randomUUID(),
      orderNumber: zeroPad(orders.length + 1, 3),
      name,
      price,
      date: Date.now(),
    };

    orders.push(order);
    return order;
  }
}
