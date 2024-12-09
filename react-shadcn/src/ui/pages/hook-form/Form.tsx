import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { IUserForm } from '@/app/types/IUserForm';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { ControlledSwitch } from './ControlledSwitch';

const schema = z.object({
  blocked: z.boolean().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  zipcode: z.string(),
  age: z.number().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
});

export type FormData = z.infer<typeof schema>;

interface IFormProps {
  user: IUserForm;
}

export function Form({ user }: IFormProps) {
  const form = useForm<FormData>({
    values: {
      ...user,
      blocked: false,
    },
    resetOptions: {
      keepDirtyValues: true,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState,
    clearErrors,
    reset,
    setFocus,
    setValue,
    watch,
    setError,
    trigger,
    control,
  } = form;

  useEffect(() => {
    const { unsubscribe } = watch(async (formData, { name }) => {
      const zipcode = formData.zipcode ?? '';

      if (name === 'zipcode' && zipcode.length >= 8) {
        const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`);
        const body = await response.json();

        if (body.erro) {
          setError('zipcode', {
            type: 'validate',
            message: 'O CEP informado é inválido',
          });

          return;
        }

        setValue('city', body.localidade);
        setValue('street', body.logradouro);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [watch, setValue, setError]);

  const handleSubmit = hookFormHandleSubmit(
    async (data) => {
      // await sleep(2000);
      reset(data);
      if (data) {
        toast.success('Formulário submetido com sucesso');
      }
    },
    (errors) => {
      // eslint-disable-next-line no-console
      console.error({ errors });
    },
  );

  const isDirty = Object.keys(formState.dirtyFields).length > 0;

  return (
    <FormProvider {...form}>
      <div className="flex min-h-screen flex-col items-center justify-center">
        {formState.isLoading && <h1>Carregando dados...</h1>}

        <form onSubmit={handleSubmit} className="flex w-96 flex-col gap-2">
          <div>
            <ControlledSwitch control={control} name="blocked" />
          </div>

          <div>
            <Input placeholder="Nome" {...register('name')} />

            <ErrorMessage
              errors={formState.errors}
              name="name"
              render={({ message }) => <small className="block text-red-400">{message}</small>}
            />
          </div>

          <div>
            <Input
              type="number"
              placeholder="Idade"
              {...register('age', { valueAsNumber: true })}
            />

            <ErrorMessage
              errors={formState.errors}
              name="age"
              render={({ message }) => <small className="block text-red-400">{message}</small>}
            />
          </div>

          <div>
            <Input type="number" placeholder="CEP" {...register('zipcode')} />

            <ErrorMessage
              errors={formState.errors}
              name="zipcode"
              render={({ message }) => <small className="block text-red-400">{message}</small>}
            />
          </div>

          <Input placeholder="Cidade" {...register('city')} />

          <Input placeholder="Rua" {...register('street')} />

          <div className="mt-4 flex gap-2">
            <Button className="flex-1" disabled={!isDirty || formState.isSubmitting}>
              Salvar
            </Button>

            <Button className="flex-1" disabled={isDirty || formState.isSubmitting}>
              Enviar
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={() => {
                clearErrors();
              }}
            >
              Limpar erros
            </Button>

            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={() => {
                setFocus('age');
              }}
            >
              Focar na idade
            </Button>

            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={() => {
                trigger('age');
              }}
            >
              Forçar validação
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
