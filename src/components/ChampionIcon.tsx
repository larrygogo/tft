import { cn } from "@/lib/utils";
import { Piece, Job } from "@/types/types";
import jobsJson from "@/data/jobs.json";
import JobIcon from "./JobIcon";

const jobs: Job[] = jobsJson as Job[];

interface ChampionIconProps extends React.HTMLAttributes<HTMLDivElement> {
  champion: Piece;
  isSelect?: boolean;
  showName?: boolean;
  showJob?: boolean;
}

const ChampionIcon = (props: ChampionIconProps) => {
  const { champion, isSelect, showName, showJob, className, ...rest } = props;

  const cover = getCover(champion);

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
          backgroundImage: `url(${cover})`,
        }}
      />
      {showJob && championJobs.length > 0 && (
        <div className="flex gap-[1px] justify-center absolute -top-2 left-0 right-0  text-white text-center text-xs truncate w-full z-50">
          {championJobs.map((job) => (
            <JobIcon key={job!.id} jobId={job!.id} />
          ))}
        </div>
      )}
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
              isSelect &&
                "bg-gradient-to-b from-transparent from-50% to-black  opacity-80"
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


function getCover(champion: Piece) {
  switch(champion.type) {
    case "target":
      return `/images/small/80001.png`
    case "golem":
      return `/images/small/90001.png`
    default:
      return `/images/small/${champion.id}.png`
  }
}