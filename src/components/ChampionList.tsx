import { Champion } from "@/types/types";
import { Coins } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import jobs from "@/data/jobs.json";

type ChampionListProps = {
  champions: Champion[];
};

const ChampionList = (props: ChampionListProps) => {
  const { champions } = props;

  const [currentCosts, setCurrentCosts] = useState<string>("all");
  const [currentClasses, setCurrentClasses] = useState<string>("all");
  const [currentOrigins, setCurrentOrigins] = useState<string>("all");

  const classesJobs = jobs.filter((job) => job.type === "classes");
  const originsJobs = jobs.filter((job) => job.type === "origins");

  const filteredChampions = useMemo(() => {
    let result = champions;
    if (currentCosts !== "all") {
      result = result.filter((champion) => champion.price === currentCosts);
    }

    if (currentOrigins !== "all") {
      result = result.filter((champion) =>
        champion.jobs.some((jobs) => jobs.id === currentOrigins)
      );
    }

    if (currentClasses !== "all") {
      result = result.filter((champion) =>
        champion.jobs.some((job) => job.id === currentClasses)
      );
    }

    return result;
  }, [champions, currentClasses, currentCosts, currentOrigins]);

  return (
    <div>
      <div className="flex gap-4 mb-8">
        <Select value={currentCosts} onValueChange={setCurrentCosts}>
          <SelectTrigger className="w-[180px]">
            {currentCosts === "all" ? (
              <SelectValue>费用</SelectValue>
            ) : (
              <SelectValue>{currentCosts} 金币</SelectValue>
            )}
          </SelectTrigger>
          <SelectContent className="bg-background text-foreground">
            <SelectGroup>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="1">1 金币</SelectItem>
              <SelectItem value="2">2 金币</SelectItem>
              <SelectItem value="3">3 金币</SelectItem>
              <SelectItem value="4">4 金币</SelectItem>
              <SelectItem value="5">5 金币</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={currentOrigins} onValueChange={setCurrentOrigins}>
          <SelectTrigger className="w-[180px]">
            {currentOrigins === "all" ? (
              <SelectValue>特质</SelectValue>
            ) : (
              <SelectValue>
                {originsJobs.find((job) => job.id === currentOrigins)?.name}
              </SelectValue>
            )}
          </SelectTrigger>
          <SelectContent className="bg-background text-foreground">
            <SelectGroup>
              <SelectItem value="all">全部</SelectItem>
              {originsJobs.map((job) => (
                <SelectItem key={job.id} value={job.id}>
                  {job.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={currentClasses} onValueChange={setCurrentClasses}>
          <SelectTrigger className="w-[180px]">
            {currentClasses === "all" ? (
              <SelectValue>职业</SelectValue>
            ) : (
              <SelectValue>
                {classesJobs.find((job) => job.id === currentClasses)?.name}
              </SelectValue>
            )}
          </SelectTrigger>
          <SelectContent className="bg-background text-foreground">
            <SelectGroup>
              <SelectItem value="all">全部</SelectItem>
              {classesJobs.map((job) => (
                <SelectItem key={job.id} value={job.id}>
                  {job.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 grid-cols-1 p-4 sm:p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredChampions.map((champion) => (
          <div
            key={champion.id}
            className="space-y-2 bg-[#201f59] hover:ring-2 ring-yellow-400"
          >
            <div>
              <div
                className="relative aspect-[250/128] bg-cover"
                style={{
                  backgroundImage: `url(/images/big/${champion.id}.jpg)`,
                }}
              >
                <div
                  className="absolute bg-cover bg-no-repeat w-1/2 h-full -left-0.5 blur-[20px] opacity-[0.8]"
                  style={{
                    backgroundImage: `url(/images/big/${champion.id}.jpg)`,
                  }}
                ></div>
                <div className="space-y-2 absolute left-4 bottom-4">
                  {champion.jobs.map((job) => (
                    <div className="flex gap-2 items-center" key={job.id}>
                      <div className="p-0.5 size-4 bg-gray-600/50 rounded-full">
                        <img
                          className="size-3"
                          src={`/images/job/${job.id}.png`}
                          style={{
                            filter: `contrast(0.1) brightness(10)`,
                          }}
                          alt={job.name}
                        />
                      </div>
                      <span className="text-sm">{job.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between p-2 text-sm lg:text-md">
                <div className="flex gap-4">
                  <div>{champion.name}</div>
                  <div>{champion.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Coins size={14} />
                  <div className="text-sm text-yellow-400">
                    {champion.price} 金币
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampionList;
