import { cn } from "@/lib/utils";
import { Champion } from "@/types/types";
import jobsJson from "@/data/jobs.json";
import { Job } from "@/lib/find";

const jobs: Job[] = jobsJson;

interface ChampionIconProps extends React.HTMLAttributes<HTMLDivElement> {
  champion: Champion;
  isSelect?: boolean;
  showName?: boolean;
  coverId?: string;
}

const ChampionIcon = (props: ChampionIconProps) => {
  const { champion, isSelect, showName, className, coverId, ...rest } = props;

  const cover = coverId ? coverId : champion.id;

  // 获取 job
  const championJobs = champion.jobs.map((job) => jobs.find((j) => j.id === job));

  return (
    <div
      className={cn(
        "relative aspect-[1/1] size-14 bg-cover",
        "bg-[#201f59] border-2 border-transparent rounded cursor-pointer",
        champion.price === "1" && "border-cost-1",
        champion.price === "2" && "border-cost-2",
        champion.price === "3" && "border-cost-3",
        champion.price === "4" && "border-cost-4",
        champion.price === "5" && "border-cost-5",
        className
      )}
      {...rest}
    >
      <div
        className={cn("bg-cover cursor-pointer w-full h-full")}
        style={{
          backgroundImage: `url(/images/small/${cover}.png)`,
        }}
      />
      {!showName && (
        <div
          className={cn(
            "absolute inset-0 top-0 h-full bg-gradient-to-b from-black to-black opacity-50",
            isSelect && "bg-none"
          )}
        />
      )}
      {showName && (
        <>
          <div
            className={cn(
              "absolute inset-0 top-0 h-full bg-gradient-to-b from-black to-black opacity-50",
              isSelect && "bg-gradient-to-b from-transparent from-50% to-black  opacity-80"
            )}
          />
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-1 text-slate-300 text-center text-xs truncate w-full drop-shadow",
              isSelect && "text-white"
            )}
          >
            {champion.name}
          </div>
        </>
      )}
    </div>
  );
};

export default ChampionIcon;
