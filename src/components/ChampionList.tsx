import { Piece } from "@/types/types";
import ChampionIcon from "@/components/ChampionIcon";
import { cn } from "@/lib/utils";
 
interface ChampionListProps extends React.HTMLAttributes<HTMLDivElement> {
  champions: Piece[];
  showName?: boolean;
  selected: Piece[];
  onSelectedChange: (champion: Piece[]) => void;
}

const ChampionList = (props: ChampionListProps) => {
  const { champions, showName, selected, onSelectedChange, ...rest } = props;



  const handleSelect = (champion: Piece) => {
    const set = new Set(selected)
    if (set.has(champion)) {
      set.delete(champion)
    } else {
      set.add(champion)
    }
    onSelectedChange(Array.from(set))
  }

  return (
    <div {...rest} className={cn("grid grid-cols-[repeat(auto-fill,minmax(54px,1fr))] gap-2")}>
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
