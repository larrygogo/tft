import ChampionFilter from "@/components/ChampionFilter";
import { useMemo, useState } from "react";
import champions from "@/data/champions.json";
import { Piece } from "@/types/types";
import ChampionList from "@/components/ChampionList";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ChampionIcon from "@/components/ChampionIcon";
import { nanoid } from "nanoid";
import { Minus, Plus, PlusIcon, Trash2 } from "lucide-react";
import JobSelect from "@/components/JobSelect";
import JobIcon from "@/components/JobIcon";
import { evaluateCombination, findMoreActiveJobCombination, getActiveJobs, getJobCount, jobs, specialMap } from "@/lib/find";
import { toast } from "sonner";
import { AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogPortal, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const target = specialMap.get("80001") as Piece;
const golem = specialMap.get("90001") as Piece;

type JobSelectArray = [
  string | undefined,
  string | undefined,
  string | undefined
];

const SimulatorPage = () => {
  const [showName, setShowName] = useState(true);
  const [selectedChampion, setSelectedChampion] = useState<Piece[]>([]);
  const [filteredChampions, setFilteredChampions] = useState<Piece[]>(
    champions as Piece[]
  );
  const [filterOrigins, setFilterOrigins] = useState<string>("all");
  const [filterClasses, setFilterClasses] = useState<string>("all");
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
  const [count, setCount] = useState<number>(9)
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Piece[]>([]);

  const selectedJobCount = useMemo(() => {
    return getJobCount(selectedChampion).sort((a, b) => b.count - a.count);
  }, [selectedChampion]);

  const selectedActiveJob = useMemo(() => {
    return getActiveJobs(selectedChampion);
  }, [selectedChampion]);

  const resultJobCount = useMemo(() => {
    return getJobCount(result).sort((a, b) => b.count - a.count);
  }, [result]);

  const resultActiveJob = useMemo(() => {
    return getActiveJobs(result);
  }, [result]);

  const evaluate = useMemo(() => {
    return evaluateCombination(result);
  }, [result]);

  const handleCalculate = () => {
    const championCount = selectedChampion.filter((champion) => champion.type === "champion").length;
    if (count - championCount > 5) {
      toast.error("目标人口数过大，无法计算");
      return;
    }
    setLoading(true);
    const res = findMoreActiveJobCombination({
      combination: selectedChampion,
      count,
    })
    setResult(res as Piece[]);
    setLoading(false);
  }

  return (
    <div className="container mx-auto px-2 min-w-[1200px]">
      <div className="grid grid-cols-4 gap-4 my-8">
        <div className="bg-card p-4 min-h-80">
          <ChampionFilter
            origins={filterOrigins}
            classes={filterClasses}
            onOriginsChange={setFilterOrigins}
            onClassesChange={setFilterClasses}
            champions={champions as Piece[]}
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
          <div className="bg-card">
            <div className="flex gap-2 border-b  p-4 border-slate-600">
              <div className="flex items-center gap-2">
                <Switch
                  id="airplane-mode"
                  checked={showName}
                  onCheckedChange={setShowName}
                />
                <Label htmlFor="airplane-mode">显示名字</Label>
              </div>
              <AlertDialog>
                <AlertDialogTrigger className="flex items-center p-1 text-xs bg-purple-800 rounded">
                  <PlusIcon size={14} />
                  <span className="ml-1">目标假人</span>
                </AlertDialogTrigger>
                <AlertDialogPortal container={document.body}>
                  {/* <AlertDialogOverlay /> */}
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>添加目标假人</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                      请为目标假人选择羁绊
                    </AlertDialogDescription>
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
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          const newTarget = {
                            ...target,
                            id: nanoid(),
                            jobs: targetJobs.filter(Boolean),
                          } as Piece;
                          setSelectedChampion([...selectedChampion, newTarget]);
                          setTargetJobs([undefined, undefined, undefined]);
                        }}
                      >
                        添加
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogPortal>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger className="flex items-center p-1 text-xs bg-purple-800 rounded">
                  <PlusIcon size={14} />
                  <span className="ml-1">雕纹魔像</span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>添加雕纹魔像</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    请为雕纹魔像选择羁绊
                  </AlertDialogDescription>
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
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        const newGolem = {
                          ...golem,
                          id: nanoid(),
                          jobs: golemJobs.filter(Boolean),
                        } as Piece;
                        setSelectedChampion([...selectedChampion, newGolem]);
                        setGolemJobs([undefined, undefined, undefined]);
                      }}
                    >
                      添加
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="p-4">
              <Label>已选弈子</Label>
              {selectedChampion.length === 0 && (
                <div className="text-sm mt-4">请从左侧选择弈子添加</div>
              )}
              {selectedChampion.length > 0 && (
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
              )}
              <div className="flex gap-x-4 gap-y-1 flex-wrap">
                {selectedJobCount.map((job) => {
                  const bonus = jobs.get(job.id)!.bonus;
                  const active = selectedActiveJob.find((j) => j.id === job.id);
                  const activeColor = getActiveColor(bonus, active?.level ?? 0);
                  return (
                    <div
                      key={job.id}
                      className="flex gap-1 items-center mt-2 cursor-pointer"
                      onClick={() => {
                        const jobInfo = jobs.get(job.id)!;
                        if (jobInfo.type === "classes") {
                          if (filterClasses === jobInfo.id) {
                            setFilterClasses("all");
                          } else {
                            setFilterClasses(jobInfo.id);
                          }
                        }
                        if (jobInfo.type === "origins") {
                          if (filterOrigins === jobInfo.id) {
                            setFilterOrigins("all");
                          } else {
                            setFilterOrigins(jobInfo.id);
                          }
                        }
                      }}
                    >
                      <JobIcon jobId={job.id} {...activeColor} />
                      <div className="text-xs">
                        {job.name}({job.count})
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="bg-card p-4">
            <div className="flex gap-2">
              <div>运算</div>
              <div className="flex gap-2 text-xs items-center">
                <span>目标人口数：</span>
                <button
                  onClick={() => {
                    if (count > 2) {
                      setCount(count - 1);
                    }
                  }}
                >
                  <Minus size={14} />
                </button>
                <span>{count}</span>
                <button
                  onClick={() => {
                    if (count < 20) {
                      setCount(count + 1);
                    }
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>
              <button disabled={loading} onClick={handleCalculate}>
                {loading ? "计算中..." : "开始计算"}
              </button>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {result.length > 0 ? (
                result.map((champion) => (
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
                ))
              ) : (
                <div className="text-sm mt-4">请点击开始计算</div>
              )}
            </div>
            <div className="flex gap-x-4 gap-y-1 flex-wrap">
              {resultJobCount.map((job) => {
                const bonus = jobs.get(job.id)!.bonus;
                const active = resultActiveJob.find((j) => j.id === job.id);
                const activeColor = getActiveColor(bonus, active?.level ?? 0);
                return (
                  <div key={job.id} className="flex gap-1 items-center mt-2">
                    <JobIcon jobId={job.id} {...activeColor} />
                    <div className="text-xs">
                      {job.name}({job.count})
                    </div>
                  </div>
                );
              })}
            </div>
            {result.length > 0 && (
              <div className="mt-2">
                <div>评分：{evaluate.totalStrength.toFixed(2)}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SimulatorPage;


function getActiveColor(bonus: number[], level: number) {
  if (bonus.length === 1) {
    return {
      bgFill: "#de5b1a",
      borderStroke: "#fdb08a",
      iconFill: "#fff",
    }
    
  }

  if (level === 0) {
    return {
      bgFill: "#111",
      borderStroke: "#555",
      iconFill: "#fff",
    }
  }

  if (level === 1) {
    return {
      bgFill: "#7f4f3e",
      borderStroke: "#a5644a",
      iconFill: "#fff",
    }
  }

  if (level === 2) {
    return {
      bgFill: "#818181",
      borderStroke: "#a7a399",
      iconFill: "#fff",
    }
  }

  if (level === 3) {
    return {
      bgFill: "#ae8b42",
      borderStroke: "#c6aa4f",
      iconFill: "#fff",
    }
  }

  if (level === 4) {
    return {
      bgFill: "#d4f6f1",
      borderStroke: "#60dace",
      iconFill: "#1c1c1c",
    }
  }
}
