import { useEffect, useState } from 'react';

import { sleep } from '@/app/libs/utils';
import { type IUserForm } from '@/app/types/IUserForm';

import { Form } from './Form';

async function getUser() {
  await sleep(100);

  return {
    age: 26,
    city: 'Curitiba',
    name: 'Mateus Silva',
    street: 'Hoje não sequestrador',
    zipcode: '88',
  };
}

export function HookformPage() {
  const [user, setUser] = useState({} as IUserForm);

  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });
  }, []);

  return <Form user={user} />;
}
