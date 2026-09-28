"use client";

import { useMemo, useState } from "react";

import type { VerificationType } from "@shared/types";

import { Input } from "@/components/ui/Input";
import type { LocalOption } from "@/components/ui/LocalSearchSelect";
import { Select } from "@/components/ui/Select";
import type { StepCardProps } from "@/types/missions/StepBuilderTypes";
import { StepCardConfig } from "./StepCardConfig";

const VERIFICATION_OPTIONS = [
  { value: "IMAGE", label: "Captura / Imagen de evidencia" },
  { value: "TEXT", label: "Texto / Código de confirmación" },
  { value: "GAME_PLAY", label: "Juego en LuckyBet (GAME_PLAY)" },
];

export type StepCardMode = "provider" | "game";

export function StepCard({
  step,
  index,
  totalSteps,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  errors,
  games = [],
  providers = [],
}: StepCardProps) {
  const isGamePlay = step.verificationType === "GAME_PLAY";
  const gameConfig = step.targetConfig ?? { minBet: 1 };
  const [mode, setMode] = useState<StepCardMode>(
    step.targetConfig?.provider ? "provider" : "game",
  );

  const gameOptions: LocalOption[] = useMemo(() => {
    return games.map((g) => ({
      value: String(g.name || g.id),
      label: g.title || g.name,
      sublabel: g.provider || g.label,
    }));
  }, [games]);

  const providerOptions: LocalOption[] = useMemo(() => {
    return providers.map((p) => ({
      value: p.name,
      label: p.name,
      sublabel: p.name && p.name !== p.slug ? p.name : undefined,
    }));
  }, [providers]);

  const handleModeToggle = (selectedMode: StepCardMode) => {
    if (mode === selectedMode) return;
    setMode(selectedMode);
    if (selectedMode === "game") {
      onChange({
        ...step,
        targetConfig: {
          gameId: games[0] ? String(games[0].name || games[0].id) : "",
          provider: undefined,
          minUniqueGames: undefined,
          minBet: gameConfig.minBet || 1,
        },
      });
    } else {
      onChange({
        ...step,
        targetConfig: {
          provider: providers[0]?.name || "",
          gameId: undefined,
          minUniqueGames: 1,
          minBet: gameConfig.minBet || 1,
        },
      });
    }
  };

  return (
    <div className="flex items-start gap-3 sm:gap-4 bg-surface-container-low/80 border border-outline-variant/20 rounded-2xl p-4 transition-all">
      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/15 border border-primary/30 text-primary text-xs font-bold shrink-0 mt-1 shadow-sm">
        {index + 1}
      </div>

      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div>
          <Input
            id={`step-${index}-title`}
            placeholder="Título o instrucción del paso (obligatorio)"
            value={step.title}
            onChange={(e) => onChange({ ...step, title: e.target.value })}
            wrapperClassName="w-full"
            className="bg-surface-container-lowest/80 text-sm py-2.5"
          />
          {errors?.title && (
            <p className="mt-1 text-label-sm text-error text-xs">
              {errors.title}
            </p>
          )}
        </div>

        <Select
          id={`step-${index}-type`}
          options={VERIFICATION_OPTIONS}
          value={step.verificationType}
          isRelative={true}
          onChange={(value) => {
            const vType = value as VerificationType;
            onChange({
              ...step,
              verificationType: vType,
              targetConfig:
                vType === "GAME_PLAY"
                  ? {
                      gameId: games[0]
                        ? String(games[0].name || games[0].id)
                        : "",
                      minBet: 1,
                    }
                  : undefined,
            });
          }}
          className="w-full"
        />

        {/* GamePlay Configuration Section */}
        {isGamePlay && (
          <StepCardConfig
            index={index}
            mode={mode}
            gameConfig={gameConfig}
            gameOptions={gameOptions}
            providerOptions={providerOptions}
            onConfigChange={(cfg) => onChange({ ...step, targetConfig: cfg })}
            onModeToggle={handleModeToggle}
          />
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0 mt-1">
        <button
          type="button"
          disabled={index === 0}
          onClick={onMoveUp}
          className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          aria-label="Mover paso arriba"
        >
          <span className="material-symbols-outlined text-lg">
            arrow_upward
          </span>
        </button>

        <button
          type="button"
          disabled={index === totalSteps - 1}
          onClick={onMoveDown}
          className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          aria-label="Mover paso abajo"
        >
          <span className="material-symbols-outlined text-lg">
            arrow_downward
          </span>
        </button>

        <div className="relative group">
          <button
            type="button"
            disabled={totalSteps <= 1}
            onClick={onRemove}
            className="p-1.5 rounded-lg text-error/70 hover:text-error hover:bg-error-container/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            aria-label="Eliminar paso"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

StepCard.displayName = "StepCard";
