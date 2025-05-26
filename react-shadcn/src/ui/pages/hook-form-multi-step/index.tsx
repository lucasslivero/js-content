import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { safeSessionStorageGetItem, sleep } from '@/app/libs/utils';

import { Stepper } from './components/Stepper';
import { AccountStep } from './components/steps/AccountStep';
import { accountStepSchema } from './components/steps/AccountStep/schema';
import { AddressStep } from './components/steps/AddressStep';
import { addressStepSchema } from './components/steps/AddressStep/schema';
import { PersonalDataStep } from './components/steps/PersonalDataStep';
import { personalDataStepSchema } from './components/steps/PersonalDataStep/schema';

const schema = z.object({
  accountStep: accountStepSchema,
  addressStep: addressStepSchema,
  personalDataStep: personalDataStepSchema,
});

export type FormData = z.infer<typeof schema>;

export function HookformMultiStepPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: safeSessionStorageGetItem<FormData>('onboarding-form') ?? {
      accountStep: {
        email: '',
        password: '',
      },
      personalDataStep: {
        firstName: '',
        lastName: '',
        document: '',
      },
      addressStep: {
        state: '',
        city: '',
        street: '',
      },
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((formData) => {
      sessionStorage.setItem('onboarding-form', JSON.stringify(formData));
    });

    return () => {
      unsubscribe();
    };
  }, [form]);

  const handleSubmit = form.handleSubmit(async (formData) => {
    // eslint-disable-next-line no-console
    console.log('Enviando para a API:', formData);

    await sleep(2000);

    sessionStorage.removeItem('onboarding-form');
  });

  return (
    <div className="flex min-h-screen justify-center pt-40">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <Stepper
            steps={[
              {
                label: 'Conta',
                content: <AccountStep />,
              },
              {
                label: 'Dados pessoais',
                content: <PersonalDataStep />,
              },
              {
                label: 'Endereço',
                content: <AddressStep />,
              },
            ]}
          />
        </form>
      </FormProvider>
    </div>
  );
}
