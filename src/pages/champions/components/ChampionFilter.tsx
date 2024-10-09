import { Champion } from "@/types/types";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import jobs from "@/data/jobs.json";

const ChampionFilter = ({
  champions,
  setFilteredChampions,
}: {
  champions: Champion[];
  setFilteredChampions: React.Dispatch<React.SetStateAction<Champion[]>>;
}) => {
  const [currentCosts, setCurrentCosts] = useState<string>("all");
  const [currentClasses, setCurrentClasses] = useState<string>("all");
  const [currentOrigins, setCurrentOrigins] = useState<string>("all");
  const [filterName, setFilterName] = useState<string>("");

  const classesJobs = jobs.filter((job) => job.type === "classes");
  const originsJobs = jobs.filter((job) => job.type === "origins");

  useEffect(() => {
    let result = champions;
    if (currentCosts !== "all") {
      result = result.filter((champion) => champion.price === currentCosts);
    }

    if (currentOrigins !== "all") {
      result = result.filter((champion) =>
        champion.jobs.some((job) => job === currentOrigins)
      );
    }

    if (currentClasses !== "all") {
      result = result.filter((champion) =>
        champion.jobs.some((job) => job === currentClasses)
      );
    }

    if (filterName) {
      result = result.filter((champion) =>
        champion.title.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    setFilteredChampions(result);
  }, [
    champions,
    currentClasses,
    currentCosts,
    currentOrigins,
    filterName,
    setFilteredChampions,
  ]);

  return (
    <div className="flex gap-4">
      <Select value={currentCosts} onValueChange={setCurrentCosts}>
        <SelectTrigger className="w-[180px]">
          {currentCosts === "all" ? (
            <SelectValue>费用</SelectValue>
          ) : (
            <SelectValue>{currentCosts} 金币</SelectValue>
          )}
        </SelectTrigger>
        <SelectContent>
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
        <SelectContent>
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
        <SelectContent>
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
      <Input
        className="w-[180px]"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        placeholder="搜索英雄"
      />
    </div>
  );
};

export default ChampionFilter;
