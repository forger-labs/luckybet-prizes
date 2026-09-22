export function MissionIntegrityBanner() {
  return (
    <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
      <div className="rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 p-5 flex items-start gap-3 backdrop-blur-md">
        <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">
          verified_user
        </span>
        <div className="text-label-sm text-on-surface-variant">
          <p className="font-bold text-on-surface mb-1">Estado de Integridad</p>
          <p className="leading-relaxed">
            Las misiones activas están protegidas contra modificaciones
            concurrentes para asegurar la equidad de los jugadores.
          </p>
        </div>
      </div>
    </aside>
  );
}

MissionIntegrityBanner.displayName = "MissionIntegrityBanner";
