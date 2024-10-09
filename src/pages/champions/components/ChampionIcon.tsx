import { cn } from "@/libs/utils";
import { Champion } from "@/types/types";



const ChampionCard = (props: { 
  champion: Champion
  isSelect?: boolean
  onClick: (champion: Champion) => void
 }) => {
  const { champion, isSelect, onClick } = props;
  return (
    <div
      key={champion.id}
      className={cn(
        "space-y-2 bg-[#201f59] hover:ring-2 ring-yellow-400 overflow-hidden",
        isSelect && "ring-2 ring-yellow-400"
      )}
      onClick={() => onClick(champion)}
    >
      <div>
        <div
          className="relative aspect-[1/1] bg-cover min-w-10 cursor-pointer"
          style={{
            backgroundImage: `url(/images/small/${champion.id}.png)`,
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default ChampionCard;
