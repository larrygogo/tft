import { Champion } from "@/types/types";
import ChampionCard from "./ChampionCard";

type ChampionListProps = {
  champions: Champion[];
};

const ChampionList = (props: ChampionListProps) => {
  const { champions } = props;

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 p-4 sm:p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {champions.map((champion) => (
          <ChampionCard key={champion.id} champion={champion} />
        ))}
      </div>
    </div>
  );
};

export default ChampionList;
