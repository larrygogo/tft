import ChampionList from "./components/ChampionList";
import champions from "@/data/champions.json";
import { Champion } from "@/types/types";
import ChampionFilter from "./components/ChampionFilter";
import { useState } from "react";
import { Component, Group, List } from "lucide-react";
import { cn } from "@/libs/utils";
import ChampionIconList from "./components/ChampionIconList";

const Champions = () => {
  const [filteredChampions, setFilteredChampions] = useState<Champion[]>(
    champions as Champion[]
  );

  const [showMode, setShowMode] = useState<"card" | "icon">("card");

  return (
    <div className="mx-auto container py-8 ">
      <div className="flex gap-8 mb-8">
        <ChampionFilter
          champions={champions as Champion[]}
          setFilteredChampions={setFilteredChampions}
        />
        <div className="flex">
          <div
            className={cn(
              "flex items-center justify-center size-9 border-2 border-frontground cursor-pointer",
              showMode === "card" && "border-yellow-400 text-yellow-400 z-10"
            )}
            onClick={() => setShowMode("card")}
          >
            <Component size={16} />
          </div>
          <div
            className={cn(
              "flex items-center justify-center size-9 border-2 border-frontground -ml-0.5 cursor-pointer",
              showMode === "icon" && "border-yellow-400 text-yellow-400 z-10"
            )}
            onClick={() => setShowMode("icon")}
          >
            <List size={16} />
          </div>
        </div>
      </div>
      {showMode === "card" && <ChampionList champions={filteredChampions} />}
      {showMode === "icon" && <ChampionIconList champions={filteredChampions} />}
    </div>
  );
};

export default Champions;
