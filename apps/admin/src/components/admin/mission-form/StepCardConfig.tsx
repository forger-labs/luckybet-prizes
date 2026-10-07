"use client";

import type { GamePlayStepConfig } from "@shared/types";

import { Input } from "@/components/ui/Input";
import { SearchSelect } from "@/components/ui/SearchSelect";
import type { SearchSelectOption } from "@/types/SearchSelect";
import type { StepCardMode } from "./StepCard";

interface StepCardConfigProps {
  index: number;
  mode: StepCardMode;
  gameConfig: GamePlayStepConfig;
  gameOptions: SearchSelectOption[];
  providerOptions: SearchSelectOption[];
  onConfigChange: (config: GamePlayStepConfig) => void;
  onModeToggle: (mode: StepCardMode) => void;
}

export function StepCardConfig({
  index,
  mode,
  gameConfig,
  gameOptions,
  providerOptions,
  onConfigChange,
  onModeToggle,
}: StepCardConfigProps) {
  return (
    <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-primary/25 flex flex-col gap-3 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base">
            sports_esports
          </span>
          <span>Configuración de Juego</span>
        </span>

        <div className="flex p-0.5 rounded-lg bg-surface-container-high border border-outline-variant/20 text-xs">
          <button
            type="button"
            onClick={() => onModeToggle("game")}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              mode === "game"
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Juego Específico
          </button>
          <button
            type="button"
            onClick={() => onModeToggle("provider")}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              mode === "provider"
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Por Proveedor
          </button>
        </div>
      </div>

      {mode === "game" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor={`step-${index}-gameId`}
              className="text-[11px] font-semibold text-on-surface-variant block mb-1"
            >
              Juego de LuckyBet
            </label>
            <SearchSelect
              id={`step-${index}-gameId`}
              icon="casino"
              placeholder="Seleccionar juego..."
              searchPlaceholder="Buscar juego en catálogo..."
              options={gameOptions}
              value={gameConfig.gameId || ""}
              onChange={(val) =>
                onConfigChange({
                  ...gameConfig,
                  gameId: val,
                  provider: undefined,
                  minUniqueGames: undefined,
                })
              }
            />
          </div>

          <div>
            <label
              htmlFor={`step-${index}-minBet`}
              className="text-[11px] font-semibold text-on-surface-variant block mb-1"
            >
              Apuesta Mínima por ronda
            </label>
            <Input
              id={`step-${index}-minBet`}
              type="number"
              icon="payments"
              placeholder="1.0"
              min={0}
              step="any"
              value={gameConfig.minBet ?? 1}
              onChange={(e) =>
                onConfigChange({
                  ...gameConfig,
                  minBet: Number(e.target.value) || 0,
                })
              }
              wrapperClassName="w-full"
              className="bg-surface-container-lowest/80 text-sm py-2.5"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <label
              htmlFor={`step-${index}-provider`}
              className="text-[11px] font-semibold text-on-surface-variant block mb-1"
            >
              Proveedor
            </label>
            <SearchSelect
              id={`step-${index}-provider`}
              icon="business"
              placeholder="Seleccionar proveedor..."
              searchPlaceholder="Buscar proveedor..."
              options={providerOptions}
              value={gameConfig.provider || ""}
              onChange={(val) =>
                onConfigChange({
                  ...gameConfig,
                  provider: val,
                  gameId: undefined,
                })
              }
            />
          </div>

          <div>
            <label
              htmlFor={`step-${index}-minUniqueGames`}
              className="text-[11px] font-semibold text-on-surface-variant block mb-1"
            >
              Juegos Únicos
            </label>
            <Input
              id={`step-${index}-minUniqueGames`}
              type="number"
              icon="tag"
              placeholder="1"
              min={1}
              value={gameConfig.minUniqueGames ?? 1}
              onChange={(e) =>
                onConfigChange({
                  ...gameConfig,
                  minUniqueGames: Number(e.target.value) || 1,
                })
              }
              wrapperClassName="w-full"
              className="bg-surface-container-lowest/80 text-sm py-2.5"
            />
          </div>

          <div>
            <label
              htmlFor={`step-${index}-minBet-prov`}
              className="text-[11px] font-semibold text-on-surface-variant block mb-1"
            >
              Apuesta Mínima
            </label>
            <Input
              id={`step-${index}-minBet-prov`}
              type="number"
              icon="payments"
              placeholder="1.0"
              min={0}
              step="any"
              value={gameConfig.minBet ?? 1}
              onChange={(e) =>
                onConfigChange({
                  ...gameConfig,
                  minBet: Number(e.target.value) || 0,
                })
              }
              wrapperClassName="w-full"
              className="bg-surface-container-lowest/80 text-sm py-2.5"
            />
          </div>
        </div>
      )}
    </div>
  );
}

StepCardConfig.displayName = "StepCardConfig";
