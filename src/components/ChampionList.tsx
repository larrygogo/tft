import { Champion } from "@/types/types";
import ChampionIcon from "@/components/ChampionIcon";
import { useState } from "react";
import { cn } from "@/lib/utils";
 
interface ChampionListProps extends React.HTMLAttributes<HTMLDivElement> {
  champions: Champion[];
  showName?: boolean;
  selected: Champion[];
  onSelectedChange: (champion: Champion[]) => void;
}

const ChampionList = (props: ChampionListProps) => {
  const { champions, showName, selected, onSelectedChange, ...rest } = props;



  const handleSelect = (champion: Champion) => {
    const set = new Set(selected)
    if (set.has(champion)) {
      set.delete(champion)
    } else {
      set.add(champion)
    }
    onSelectedChange(Array.from(set))
  }

  return (
    <div {...rest} className={cn("flex gap-4 flex-wrap", rest.className)}>
      {champions.map((champion) => (
        <ChampionIcon
          className="size-[54px]"
          key={champion.id}
          champion={champion}
          showName={showName}
          isSelect={selected.includes(champion)}
          onClick={() => {
            handleSelect(champion);
          }}
        />
      ))}
    </div>
  );
};

export default ChampionList;
