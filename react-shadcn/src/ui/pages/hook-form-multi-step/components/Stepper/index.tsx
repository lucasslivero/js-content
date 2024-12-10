import {
  ComponentPropsWithoutRef,
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { cn } from '@/app/libs/utils';
import { Button } from '@/components/ui/Button';

import { useStepper } from './useStepper';

interface IStepperContextValue {
  previousStep: () => void;
  nextStep: () => void;
}

export const StepperContext = createContext({} as IStepperContextValue);

interface IStepperProps {
  initialStep?: number;
  steps: {
    label: string;
    content: ReactNode;
  }[];
}

export function Stepper({ steps, initialStep = 0 }: IStepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const previousStep = useCallback(() => {
    setCurrentStep((prevState) => Math.max(0, prevState - 1));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prevState) => Math.min(steps.length - 1, prevState + 1));
  }, [steps]);

  const providerValue = useMemo(() => ({ previousStep, nextStep }), [previousStep, nextStep]);

  return (
    <StepperContext.Provider value={providerValue}>
      <div>
        <ul className="space-x-6">
          {steps.map((step, index) => (
            <li
              key={step.label}
              className={cn(
                'inline-block rounded-md px-2 py-1 text-xs',
                index === currentStep && 'bg-primary text-primary-foreground',
              )}
            >
              {String(index + 1).padStart(2, '0')}. {step.label}
            </li>
          ))}
        </ul>

        <div className="mt-10">{steps[currentStep].content}</div>
      </div>
    </StepperContext.Provider>
  );
}

export function StepperFooter({ children }: { children: ReactNode }) {
  return <footer className="mt-6 flex justify-end gap-2">{children}</footer>;
}

export function StepperPreviousButton({
  size = 'sm',
  variant = 'secondary',
  type = 'button',
  onClick,
  ...props
}: ComponentPropsWithoutRef<typeof Button>) {
  const { previousStep } = useStepper();

  return (
    <Button size={size} variant={variant} type={type} onClick={onClick ?? previousStep} {...props}>
      Anterior
    </Button>
  );
}

export function StepperNextButton({
  size = 'sm',
  type = 'button',
  onClick,
  ...props
}: ComponentPropsWithoutRef<typeof Button>) {
  const { nextStep } = useStepper();

  return (
    <Button size={size} type={type} onClick={onClick ?? nextStep} {...props}>
      Próximo
    </Button>
  );
}
