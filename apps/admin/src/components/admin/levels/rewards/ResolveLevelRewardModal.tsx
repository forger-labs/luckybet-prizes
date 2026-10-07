"use client";

import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import * as Yup from "yup";

import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import type {
  ResolveLevelRewardModalProps,
  ResolveLevelRewardPayload,
} from "@/types/adminLevels";

const ResolveSchema = Yup.object().shape({
  action: Yup.string().oneOf(["RESOLVE_CLAIMED", "FORCE_RETRY"]).required(),
  externalOperationId: Yup.string().optional(),
  adminNotes: Yup.string().optional(),
});

export function ResolveLevelRewardModal({
  reward,
  open,
  onClose,
  onResolve,
  isSubmitting = false,
}: ResolveLevelRewardModalProps) {
  const [selectedAction, setSelectedAction] = useState<
    "RESOLVE_CLAIMED" | "FORCE_RETRY"
  >("RESOLVE_CLAIMED");

  const handleSubmit = useCallback(
    async (values: { externalOperationId: string; adminNotes: string }) => {
      const payload: ResolveLevelRewardPayload = {
        action: selectedAction,
        externalOperationId: values.externalOperationId.trim() || undefined,
        adminNotes: values.adminNotes.trim() || undefined,
      };

      const success = await onResolve(payload);
      if (success) onClose();
    },
    [selectedAction, onResolve, onClose],
  );

  if (!reward) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Resolver Reclamo de Nivel"
      subtitle={`Reclamo #${reward.id} de Nivel #${reward.levelId} para Jugador #${reward.playerId}`}
      icon="build"
      size="md"
    >
      <div className="flex flex-col gap-5 py-1">
        {/* Toggle de acción */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSelectedAction("RESOLVE_CLAIMED")}
            className={`p-3.5 rounded-2xl border-2 text-left cursor-pointer transition-all ${
              selectedAction === "RESOLVE_CLAIMED"
                ? "bg-primary/15 border-primary shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                : "bg-surface-container border-outline-variant/20 hover:border-outline-variant/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-xl">
                verified
              </span>
              <span className="font-bold text-sm text-on-surface">
                Marcar Acreditado
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              El premio de nivel ya fue cargado manualmente en LuckyBet. Marca
              el estado como CLAIMED.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedAction("FORCE_RETRY")}
            className={`p-3.5 rounded-2xl border-2 text-left cursor-pointer transition-all ${
              selectedAction === "FORCE_RETRY"
                ? "bg-secondary/15 border-secondary shadow-[0_0_12px_rgba(255,198,64,0.2)]"
                : "bg-surface-container border-outline-variant/20 hover:border-outline-variant/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-secondary text-xl">
                replay
              </span>
              <span className="font-bold text-sm text-on-surface">
                Forzar Reintento
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Reintenta ejecutar la transferencia y acreditación automática del
              nivel desde el backend.
            </p>
          </button>
        </div>

        {/* Formulario */}
        <Formik
          initialValues={{
            externalOperationId: reward.externalOperationId || "",
            adminNotes: "",
          }}
          validationSchema={ResolveSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form className="flex flex-col gap-4">
              {selectedAction === "RESOLVE_CLAIMED" && (
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="resolve-level-externalOperationId"
                    className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
                  >
                    ID de Operación Externa (LuckyBet)
                  </label>
                  <Input
                    id="resolve-level-externalOperationId"
                    name="externalOperationId"
                    placeholder="ej: op_lvl_882"
                    icon="receipt"
                    value={values.externalOperationId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    wrapperClassName="w-full"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="resolve-level-adminNotes"
                  className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
                >
                  Notas del Administrador (opcional)
                </label>
                <Textarea
                  id="resolve-level-adminNotes"
                  name="adminNotes"
                  placeholder="Explique el motivo o verificación realizada..."
                  value={values.adminNotes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/15">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-body-md text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-2.5 rounded-xl text-body-md font-bold transition-all active:scale-[0.98] cursor-pointer shadow-md ${
                    selectedAction === "RESOLVE_CLAIMED"
                      ? "bg-primary text-on-primary hover:bg-primary-fixed-dim"
                      : "bg-secondary text-on-secondary hover:brightness-110"
                  }`}
                >
                  {isSubmitting
                    ? "Procesando..."
                    : selectedAction === "RESOLVE_CLAIMED"
                      ? "Confirmar Entrega"
                      : "Ejecutar Reintento"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

ResolveLevelRewardModal.displayName = "ResolveLevelRewardModal";
