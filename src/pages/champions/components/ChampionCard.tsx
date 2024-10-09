import { Champion } from "@/types/types";
import { Coins } from "lucide-react";
import {getJobDetail} from "@/lib/find"
const ChampionCard = ({ champion }: { champion: Champion }) => {
  return (
    <div
      key={champion.id}
      className="space-y-2 bg-[#201f59] hover:ring-2 ring-yellow-400 overflow-hidden"
      onClick={() => {
        // 复制到剪贴板
        window.navigator.clipboard.writeText(champion.id);
      }}
    >
      <div>
        <div
          className="relative aspect-[250/128] bg-cover"
          style={{
            backgroundImage: `url(/images/big/${champion.id}.jpg)`,
          }}
        >
          <div
            className="absolute bg-cover bg-no-repeat w-1/2 h-full -left-0.5 blur-[20px] opacity-[0.8]"
            style={{
              backgroundImage: `url(/images/big/${champion.id}.jpg)`,
            }}
          ></div>
          <div className="space-y-2 absolute left-4 bottom-4">
            {champion.jobs.map((jobId) => {
              const jobName = getJobDetail(jobId);

              return (
                <div className="flex gap-2 items-center" key={jobName}>
                <div className="p-0.5 size-4 bg-gray-600/50 rounded-full">
                  <img
                    className="size-3"
                    src={`/images/job/${jobId}.png`}
                    style={{
                      filter: `contrast(0.1) brightness(10)`,
                    }}
                    alt={jobName}
                  />
                </div>
                <span className="text-sm">{jobName}</span>
              </div>
              )
            })}
          </div>
        </div>
        <div className="flex justify-between p-2 text-sm lg:text-md">
          <div className="flex gap-4">
            <div>{champion.name}</div>
            <div>{champion.title}</div>
          </div>
          <div className="flex items-center gap-2">
            <Coins size={14} />
            <div className="text-sm text-yellow-400">{champion.price} 金币</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionCard;
