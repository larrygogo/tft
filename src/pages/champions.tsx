import ChampionList from "@/components/ChampionList";
import champions from "@/data/champions.json";

const Champions = () => {
  return (
    <div className="mx-auto container py-8 ">
      <ChampionList champions={champions} />
    </div>
  );
};

export default Champions;
