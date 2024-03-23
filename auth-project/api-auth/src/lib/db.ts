import crypto from 'node:crypto';

export const orders = [
  {
    id: crypto.randomUUID(),
    orderNumber: '001',
    name: 'X-Salad',
    price: 12,
    date: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    orderNumber: '002',
    name: 'X-Egg',
    price: 10,
    date: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    orderNumber: '003',
    name: 'X-Everything',
    price: 25,
    date: Date.now(),
  },
];
