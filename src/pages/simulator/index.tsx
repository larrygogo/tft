import ChampionFilter from "@/components/ChampionFilter";
import {useState} from "react";
import champions from "@/data/champions.json";
import { Champion } from "@/types/types";
import ChampionList from "@/components/ChampionList";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ChampionIcon from "@/components/ChampionIcon";
import special from "@/data/special.json";
import { nanoid } from "nanoid";

const target = special.find((s) => s.id === "80001");
const golem = special.find((s) => s.id === "90001");

const SimulatorPage = () => {
  const [showName, setShowName] = useState(true);
  const [selectedChampion, setSelectedChampion] = useState<Champion[]>([]);
  const [filteredChampions, setFilteredChampions] = useState<Champion[]>(champions as Champion[]);

  return (
    <div className="container mx-auto px-2">
      <div className="grid grid-cols-4 gap-4 my-8">
        <div className="bg-card p-4 min-h-80">
          <ChampionFilter
            champions={champions as Champion[]}
            setFilteredChampions={setFilteredChampions}
          />
          {filteredChampions.length === 0 && (
            <div className="text-center text-sm text-slate-400 mt-4">
              没有找到符合条件的弈子
            </div>
          )}
          <div className="flex flex-col gap-4 mt-4">
            <ChampionList
              champions={filteredChampions}
              showName={showName}
              selected={selectedChampion}
              onSelectedChange={setSelectedChampion}
            />
          </div>
        </div>
        <div className="col-span-3">
          <div className="bg-card p-4">
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Switch
                  id="airplane-mode"
                  checked={showName}
                  onCheckedChange={setShowName}
                />
                <Label htmlFor="airplane-mode">显示名字</Label>
              </div>
              <button 
                className="p-1 text-xs bg-purple-800 rounded"
                onClick={() => {
                  const newTarget = {
                    ...target,
                    id: nanoid(),
                  } as Champion;
                  setSelectedChampion([...selectedChampion, newTarget]);
                }}>
                目标假人
              </button>
              <button 
                className="p-1 text-xs bg-purple-800 rounded"
                onClick={() => {
                  const newGolem = {
                    ...golem,
                    id: nanoid(),
                  } as Champion;
                  setSelectedChampion([...selectedChampion, newGolem]);
                }}>
                 雕纹魔像
              </button>
            </div>
            <div className="mt-2">
              <Label>已选弈子</Label>
            </div>
            <div className="flex gap-2 mt-2">
              {selectedChampion.map((champion) => (
                <ChampionIcon
                  className="size-12"
                  key={champion.id}
                  champion={champion}
                  isSelect
                  showJob
                  showName={showName}
                  onClick={() => {
                    setSelectedChampion(
                      selectedChampion.filter((c) => c.id !== champion.id)
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SimulatorPage;