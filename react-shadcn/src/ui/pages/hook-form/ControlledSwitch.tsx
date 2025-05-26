import { type Control, type FieldPath, type FieldValues, useController } from 'react-hook-form';

import { Switch } from '@/components/ui/Switch';

interface IControlledSwitchProps<T extends FieldValues> {
  control?: Control<T>;
  name: FieldPath<T>;
}

export function ControlledSwitch<T extends FieldValues>({
  control,
  name,
}: IControlledSwitchProps<T>) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <Switch
      ref={field.ref}
      name={field.name}
      onBlur={field.onBlur}
      onCheckedChange={field.onChange}
      checked={field.value}
      disabled={field.disabled}
    />
  );
}
