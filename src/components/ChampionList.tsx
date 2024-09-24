import { Champion } from "@/types/types";
import { Coins } from "lucide-react";

type ChampionListProps = {
  champions: Champion[];
};

const ChampionList = (props: ChampionListProps) => {
  const { champions } = props;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {champions.map((champion) => (
        <div
          key={champion.id}
          className="space-y-2 bg-[#201f59] hover:ring-2 ring-yellow-400"
        >
          <div>
            <div
              className="relative aspect-[250/128] bg-cover bg-center"
              style={{
                backgroundImage: `url(/images/big/${champion.id}.jpg)`,
              }}
            >
              <div className="space-y-2 absolute left-4 bottom-4">
                {champion.jobs.map((job) => (
                  <div className="flex gap-2 items-center" key={job.id}>
                    <div className="p-0.5 size-4 bg-gray-600/50 rounded-full">
                      <img
                        className="size-3"
                        src={`/images/job/${job.id}.png`}
                        style={{
                          filter: `contrast(0.1) brightness(10)`,
                        }}
                        alt={job.name}
                      />
                    </div>
                    <span className="text-sm">{job.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between p-2">
              <div className="flex gap-4">
                <div>{champion.name}</div>
                <div>{champion.title}</div>
              </div>
              <div className="flex items-center gap-2">
                <Coins size={14} />
                <div className="text-sm text-yellow-400">
                  {champion.price} 金币
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChampionList;
