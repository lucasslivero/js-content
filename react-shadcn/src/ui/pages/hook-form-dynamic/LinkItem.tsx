import { Label } from '@radix-ui/react-label';
import { Reorder, useDragControls } from 'framer-motion';
import { GripVerticalIcon, Trash2Icon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/app/libs/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ILinkItemProps {
  index: number;
  isDraggingActive: null | boolean;
  link: {
    title: string;
    url: string;
  };
  onDragStart: () => void;
  onDragEnd: () => void;
  onRemove: () => void;
}

export function LinkItem({
  link,
  index,
  isDraggingActive,
  onDragStart,
  onDragEnd,
  onRemove,
}: ILinkItemProps) {
  const form = useFormContext();
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={link}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="relative"
      dragListener={false}
      dragControls={controls}
    >
      <div
        className={cn('flex gap-4 transition-opacity', isDraggingActive === false && 'opacity-50')}
      >
        <div className="flex flex-1 items-end gap-4">
          <Button
            type="button"
            variant="link"
            onPointerDown={(e) => controls.start(e)}
            className="cursor-grab"
          >
            <GripVerticalIcon className="size-4" />
          </Button>

          <div className="flex-1 space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              data-teste={Math.random()}
              {...form.register(`links.${index}.title`)}
            />
          </div>
        </div>

        <div className="flex flex-1 items-end gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" {...form.register(`links.${index}.url`)} />
          </div>

          <Button type="button" variant="destructive" onClick={onRemove} tabIndex={-1}>
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      </div>
    </Reorder.Item>
  );
}
