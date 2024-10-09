import { Champion } from "@/types/types";
import ChampionIcon from "./ChampionIcon";
import { useState } from "react";
import { cn } from "@/libs/utils";
import {findMoreActiveJobCombination, getActiveJobs, evaluateCombination} from "@/lib/find";
 
type ChampionListProps = {
  champions: Champion[];
};

const ChampionList = (props: ChampionListProps) => {
  const { champions } = props;

  const [selectedChampion, setSelectedChampion] = useState<Champion[]>([])

  const [result, setResult] = useState<string[]>([])

  const handleSelect = (champion: Champion) => {
    const set = new Set(selectedChampion)
    if (set.has(champion)) {
      set.delete(champion)
    } else {
      set.add(champion)
    }
    setSelectedChampion(Array.from(set))
  }

  const handleFind = () => {

    const res = findMoreActiveJobCombination({
      combination: selectedChampion.map((champion) => champion.id),
      count: 10,
      activeLevelCounts: false
    })

    setResult(res)

    console.log(res)
  }


  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {champions.map((champion) => (
          <ChampionIcon key={champion.id} champion={champion} isSelect={
            selectedChampion.includes(champion)
          } onClick={handleSelect} />
        ))}
      </div>


      <div className=" mt-10">
        <div className="flex text-white">
          <div>
            已选择英雄：
          </div>
          <div>
            <span className="ml-6 cursor-pointer" onClick={() => setSelectedChampion([])}>清空</span>
            <span className="ml-6 cursor-pointer" onClick={handleFind}>开始</span>
          </div>
        </div>
        <div className="flex gap-2">
          {selectedChampion.map((champion) => (
            <div key={champion.id} className={cn({
              "text-cost-1": champion.price === "1",
              "text-cost-2": champion.price === "2",
              "text-cost-3": champion.price === "3",
              "text-cost-4": champion.price === "4",
              "text-cost-5": champion.price === "5", 
            })}>
              {champion.name}
            </div>
          ))}
        </div>
      </div>

      <div className=" mt-10">
        <div className="flex text-white">
          <div>
            结果
          </div>
        </div>
        <div className="flex gap-2">
          {result.map((id) => {
            const champion = champions.find((champion) => champion.id === id)
            return (
              <div key={champion!.id} className={cn({
                "text-cost-1": champion!.price === "1",
                "text-cost-2": champion!.price === "2",
                "text-cost-3": champion!.price === "3",
                "text-cost-4": champion!.price === "4",
                "text-cost-5": champion!.price === "5", 
              })}>
                {champion!.name}
              </div>
            )
          })}
        </div>
      </div>
      <div className=" mt-10">
        <div className="flex text-white">
          <div>
            队伍组成
          </div>
        </div>
        <div className="flex gap-2">
          {getActiveJobs(result).map((job) => (
            <div key={job.id} className="text-white">
              {job.count} {job.name} 
            </div>
          ))}
        </div>
      </div>
      <div className=" mt-10">
        <div className="flex text-white">
          <div>
            队伍评分
          </div>
        </div>
        <div className="flex gap-2 text-yellow-400">
          {evaluateCombination(result).totalStrength}
        </div>
      </div>
    </div>
  );
};

export default ChampionList;
