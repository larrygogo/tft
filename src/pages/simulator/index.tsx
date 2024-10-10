import ChampionFilter from "@/components/ChampionFilter";
import { useMemo, useState } from "react";
import champions from "@/data/champions.json";
import { Champion, Job } from "@/types/types";
import ChampionList from "@/components/ChampionList";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ChampionIcon from "@/components/ChampionIcon";
import special from "@/data/special.json";
import { nanoid } from "nanoid";
import { PlusIcon, Trash2 } from "lucide-react";
import jobsJson from "@/data/jobs.json";
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
import JobSelect from "@/components/JobSelect";
import JobIcon from "@/components/JobIcon";
import { getJobCount, getJobCount2 } from "@/lib/find";

const target = special.find((s) => s.id === "80001");
const golem = special.find((s) => s.id === "90001");

type JobSelectArray = [
  string | undefined,
  string | undefined,
  string | undefined
];

const SimulatorPage = () => {
  const [showName, setShowName] = useState(true);
  const [selectedChampion, setSelectedChampion] = useState<Champion[]>([]);
  const [filteredChampions, setFilteredChampions] = useState<Champion[]>(
    champions as Champion[]
  );
  const [targetJobs, setTargetJobs] = useState<JobSelectArray>([
    undefined,
    undefined,
    undefined,
  ]);
  const [golemJobs, setGolemJobs] = useState<JobSelectArray>([
    undefined,
    undefined,
    undefined,
  ]);

  const selectedJobCount = useMemo(() => {
    return getJobCount2(selectedChampion).sort((a, b) => b.count - a.count);
  }, [selectedChampion]);

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
        <div className="col-span-3 flex flex-col gap-4">
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
                    <DialogTitle>添加目标假人</DialogTitle>
                    <DialogDescription>请为目标假人选择羁绊</DialogDescription>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <JobSelect
                          scope="all"
                          placeholder="无"
                          value={targetJobs[0]}
                          onValueChange={(v) => {
                            const jobs: JobSelectArray = [...targetJobs];
                            jobs[0] = v;
                            setTargetJobs(jobs);
                          }}
                        />
                        <button
                          className="flex-shrink-0"
                          onClick={() => {
                            const jobs: JobSelectArray = [...targetJobs];
                            jobs[0] = undefined;
                            setTargetJobs(jobs);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <JobSelect
                          scope="all"
                          placeholder="无"
                          value={targetJobs[1]}
                          onValueChange={(v) => {
                            const jobs: JobSelectArray = [...targetJobs];
                            jobs[1] = v;
                            setTargetJobs(jobs);
                          }}
                        />
                        <button
                          className="flex-shrink-0"
                          onClick={() => {
                            const jobs: JobSelectArray = [...targetJobs];
                            jobs[1] = undefined;
                            setTargetJobs(jobs);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <JobSelect
                          scope="all"
                          placeholder="无"
                          value={targetJobs[2]}
                          onValueChange={(v) => {
                            const jobs: JobSelectArray = [...targetJobs];
                            jobs[2] = v;
                            setTargetJobs(jobs);
                          }}
                        />
                        <button
                          className="flex-shrink-0"
                          onClick={() => {
                            const jobs: JobSelectArray = [...targetJobs];
                            jobs[2] = undefined;
                            setTargetJobs(jobs);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>取消</DialogClose>
                    <DialogClose
                      onClick={() => {
                        const newTarget = {
                          ...target,
                          id: nanoid(),
                          jobs: targetJobs.filter(Boolean),
                        } as Champion;
                        setSelectedChampion([...selectedChampion, newTarget]);
                        setTargetJobs([undefined, undefined, undefined]);
                      }}
                    >
                      添加
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger className="flex items-center p-1 text-xs bg-purple-800 rounded">
                  <PlusIcon size={14} />
                  <span className="ml-1">雕纹魔像</span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>添加雕纹魔像</DialogTitle>
                    <DialogDescription>请为雕纹魔像选择羁绊</DialogDescription>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <JobSelect
                          scope="all"
                          placeholder="无"
                          value={golemJobs[0]}
                          onValueChange={(v) => {
                            const jobs: JobSelectArray = [...golemJobs];
                            jobs[0] = v;
                            setGolemJobs(jobs);
                          }}
                        />
                        <button
                          className="flex-shrink-0"
                          onClick={() => {
                            const jobs: JobSelectArray = [...golemJobs];
                            jobs[0] = undefined;
                            setGolemJobs(jobs);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <JobSelect
                          scope="all"
                          placeholder="无"
                          value={golemJobs[1]}
                          onValueChange={(v) => {
                            const jobs: JobSelectArray = [...golemJobs];
                            jobs[1] = v;
                            setGolemJobs(jobs);
                          }}
                        />
                        <button
                          className="flex-shrink-0"
                          onClick={() => {
                            const jobs: JobSelectArray = [...golemJobs];
                            jobs[1] = undefined;
                            setGolemJobs(jobs);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <JobSelect
                          scope="all"
                          placeholder="无"
                          value={golemJobs[2]}
                          onValueChange={(v) => {
                            const jobs: JobSelectArray = [...golemJobs];
                            jobs[2] = v;
                            setGolemJobs(jobs);
                          }}
                        />
                        <button
                          className="flex-shrink-0"
                          onClick={() => {
                            const jobs: JobSelectArray = [...golemJobs];
                            jobs[2] = undefined;
                            setGolemJobs(jobs);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>取消</DialogClose>
                    <DialogClose
                      onClick={() => {
                        const newGolem = {
                          ...golem,
                          id: nanoid(),
                          jobs: golemJobs.filter(Boolean),
                        } as Champion;
                        setSelectedChampion([...selectedChampion, newGolem]);
                        setGolemJobs([undefined, undefined, undefined]);
                      }}
                    >
                      添加
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
            <div className="flex gap-x-2 gap-y-1 flex-wrap">
              {selectedJobCount.map((job) => (
                <div key={job.id} className="flex gap-2 items-center mt-2">
                  <JobIcon jobId={job.id} />
                  <div className="text-xs">
                    {job.name}({job.count})
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card p-4">
            <div>计算结果</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SimulatorPage;
