import { Piece } from "@/types/types";
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
import { useDebounce } from "ahooks";
import JobSelect from "./JobSelect";

const ChampionFilter = ({
  champions,
  setFilteredChampions,
  origins,
  classes,
  onOriginsChange,
  onClassesChange,
}: {
  champions: Piece[];
  setFilteredChampions: React.Dispatch<React.SetStateAction<Piece[]>>;
  origins: string;
  classes: string;
  onOriginsChange: (value: string) => void;
  onClassesChange: (value: string) => void;
}) => {
  const [currentCosts, setCurrentCosts] = useState<string>("all");
  const [filterName, setFilterName] = useState<string>("");

  const debouncedFilterName = useDebounce(filterName, { wait: 500 });

  useEffect(() => {
    let result = champions;
    if (currentCosts !== "all") {
      result = result.filter((champion) => champion.price === currentCosts);
    }

    if (origins !== "all") {
      result = result.filter((champion) =>
        champion.jobs.some((job) => job === origins)
      );
    }

    if (classes !== "all") {
      result = result.filter((champion) =>
        champion.jobs.some((job) => job === classes)
      );
    }

    if (debouncedFilterName) {
      result = result.filter(
        (champion) =>
          champion.name
            .toLowerCase()
            .includes(debouncedFilterName.toLowerCase()) ||
          champion.title
            .toLowerCase()
            .includes(debouncedFilterName.toLowerCase())
      );
    }

    setFilteredChampions(result);
  }, [
    champions,
    origins,
    currentCosts,
    classes,
    debouncedFilterName,
    setFilteredChampions,
  ]);

  return (
    <div className="grid grid-cols-12 gap-y-2 w-full">
      <div className="col-span-12">
        <Input
          className="w-full focus-visible:ring-0 ring-0 focus-visible:border-yellow-500 hover:border-yellow-500"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          placeholder="搜索英雄"
        />
      </div>
      <div className="col-span-4">
        <Select value={currentCosts} onValueChange={setCurrentCosts}>
          <SelectTrigger className="w-full focus:ring-0 hover:border-yellow-500 hover:z-[2]">
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
      </div>
      <div className="col-span-4 -ml-[0.1]">
        <JobSelect
          scope="origins"
          placeholder="特质"
          value={origins}
          onValueChange={onOriginsChange}
          showAll
        />
      </div>
      <div className="col-span-4 -ml-[0.4]">
        <JobSelect
          scope="classes"
          placeholder="职业"
          value={classes}
          onValueChange={onClassesChange}
          showAll
        />
      </div>
    </div>
  );
};

export default ChampionFilter;
