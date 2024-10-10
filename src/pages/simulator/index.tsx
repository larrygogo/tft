import ChampionFilter from "@/components/ChampionFilter";
import { useState } from "react";
import champions from "@/data/champions.json";
import { Champion } from "@/types/types";
import ChampionList from "@/components/ChampionList";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ChampionIcon from "@/components/ChampionIcon";
import special from "@/data/special.json";
import { nanoid } from "nanoid";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const target = special.find((s) => s.id === "80001");
const golem = special.find((s) => s.id === "90001");

const SimulatorPage = () => {
  const [showName, setShowName] = useState(true);
  const [selectedChampion, setSelectedChampion] = useState<Champion[]>([]);
  const [filteredChampions, setFilteredChampions] = useState<Champion[]>(
    champions as Champion[]
  );

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
              <Dialog>
                <DialogTrigger className="flex items-center p-1 text-xs bg-purple-800 rounded">
                  <PlusIcon size={14} />
                  <span className="ml-1">目标假人</span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>选择羁绊</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>取消</DialogClose>
                    <button className="btn btn-primary">Delete</button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <button
                className="flex items-center p-1 text-xs bg-purple-800 rounded"
                onClick={() => {
                  const newGolem = {
                    ...golem,
                    id: nanoid(),
                  } as Champion;
                  setSelectedChampion([...selectedChampion, newGolem]);
                }}
              >
                <PlusIcon size={14} />
                <span className="ml-1">雕纹魔像</span>
              </button>
            </div>
            <div className="mt-2">
              <Label>已选弈子</Label>
            </div>
            <div className="flex gap-2 mt-2">
              {selectedChampion.map((champion) => (
                <ChampionIcon
                  className="size-20"
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
};
export default SimulatorPage;
