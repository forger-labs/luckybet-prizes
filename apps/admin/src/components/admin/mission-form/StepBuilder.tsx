"use client";

import type { FormikErrors } from "formik";

import type { MissionStep, VerificationType } from "@shared/types";

import { Button } from "@/components/ui/Button";
import type { StepBuilderProps } from "@/types/missions/StepBuilderTypes";
import { StepCard } from "./StepCard";

export function StepBuilder({ formik, readOnly = false }: StepBuilderProps) {
  const steps = (formik.values.steps as MissionStep[]) || [];
  const onChange = (newSteps: MissionStep[]) =>
    formik.setFieldValue("steps", newSteps);

  const stepsErrors = formik.errors.steps;
  const perStepErrors: Record<string, Record<string, string>> = {};
  if (Array.isArray(stepsErrors)) {
    stepsErrors.forEach(
      (err: string | FormikErrors<MissionStep> | undefined, i: number) => {
        if (err && typeof err === "object" && "title" in err) {
          perStepErrors[i] = { title: err.title ?? "" };
        }
      },
    );
  }

  const handleChange = (index: number, updatedStep: MissionStep) => {
    const newSteps = steps.map((s, i) => (i === index ? updatedStep : s));
    onChange(newSteps);
  };

  const handleRemove = (index: number) => {
    if (steps.length <= 1) return;
    const newSteps = steps
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, order: i + 1 }));
    onChange(newSteps);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSteps = [...steps];
    [newSteps[index - 1], newSteps[index]] = [
      newSteps[index],
      newSteps[index - 1],
    ];
    const reordered = newSteps.map((s, i) => ({ ...s, order: i + 1 }));
    onChange(reordered);
  };

  const handleMoveDown = (index: number) => {
    if (index === steps.length - 1) return;
    const newSteps = [...steps];
    [newSteps[index], newSteps[index + 1]] = [
      newSteps[index + 1],
      newSteps[index],
    ];
    const reordered = newSteps.map((s, i) => ({ ...s, order: i + 1 }));
    onChange(reordered);
  };

  const handleAdd = () => {
    const newStep: MissionStep = {
      id: Date.now(),
      title: "",
      verificationType: "IMAGE" as VerificationType,
      order: steps.length + 1,
    };
    onChange([...steps, newStep]);
  };

  if (readOnly) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface">
            Pasos de Verificación
          </h4>
          <p className="text-label-sm text-on-surface-variant">
            Defina la secuencia de acciones que el jugador debe completar
          </p>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
          {steps.length} {steps.length === 1 ? "paso" : "pasos"}
        </span>
      </div>

      {steps.length === 0 && (
        <p className="text-body-md text-outline">
          No hay pasos configurados. Agregue al menos un paso para crear la
          misión.
        </p>
      )}

      <div className="space-y-3">
        {steps.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            index={index}
            totalSteps={steps.length}
            onChange={(updated) => handleChange(index, updated)}
            onRemove={() => handleRemove(index)}
            onMoveUp={() => handleMoveUp(index)}
            onMoveDown={() => handleMoveDown(index)}
            errors={perStepErrors[index]}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        leadingIcon="add_circle"
        onClick={handleAdd}
        className="self-start mt-1 text-sm font-semibold border-dashed cursor-pointer"
      >
        Agregar paso adicional
      </Button>
    </div>
  );
}

StepBuilder.displayName = "StepBuilder";
