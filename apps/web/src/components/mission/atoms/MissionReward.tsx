import { CoinsIcon } from "@/icons";

interface Props {
  reward: string;
  xp?: string;
  completed?: boolean;
}

export const MissionReward = ({ reward, xp, completed }: Props) => {
  const formattedReward = reward.startsWith("+") ? reward : `+${reward}`;

  return (
    <div className="inline-flex items-center gap-1.5 flex-wrap">
      <span
        className={`font-black text-xs sm:text-sm inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 transition-all shadow-sm ${
          completed
            ? "text-[#87929a] bg-[#131b2e] line-through border-[#2d3449]"
            : "text-[#402d00] bg-[#ffc640] border-[#ffdf9f]"
        }`}
      >
        <CoinsIcon
          className={`w-4 h-4 shrink-0 ${completed ? "text-[#87929a]" : "text-[#402d00]"}`}
        />
        <span>{formattedReward}</span>
      </span>

      {xp && !completed && (
        <span className="font-black text-xs inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[#00354a] bg-[#8ed5ff] border-2 border-[#c4e7ff] shadow-sm">
          <span className="material-symbols-outlined text-[14px]">bolt</span>
          <span>+{xp}</span>
        </span>
      )}
    </div>
  );
};
