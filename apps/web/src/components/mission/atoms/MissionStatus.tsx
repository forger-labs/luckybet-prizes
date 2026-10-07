import type { MissionStatusType } from "@/types/missions";

interface Props {
  status?: MissionStatusType;
  completed?: boolean;
}

export const MissionStatus = ({ status, completed }: Props) => {
  const isCompleted = completed || status === "completed";
  const isInProgress = status === "in_progress";
  const isExpired = status === "expired";

  if (isCompleted) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-black bg-[#064e3b] text-[#34d399] border border-[#059669] shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
        Completada
      </span>
    );
  }

  if (isInProgress) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-black bg-on-primary text-primary border border-[#38bdf8] shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping" />
        En Curso
      </span>
    );
  }

  if (isExpired) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-black bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]">
        Expirada
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#222a3d] text-[#dae2fd] border border-[#3e484f]">
      Disponible
    </span>
  );
};
