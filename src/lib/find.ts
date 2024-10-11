import championsJson from "@/data/champions.json" assert { type: 'json' } ;
import jobsJson from "@/data/jobs.json" assert { type: 'json' } ;
import specialJson from "@/data/special.json" assert { type: 'json' } ;
import { Piece } from "@/types/types";

const global = {
  GAIN_LEVEL: 1.2,
};


export const champions = new Map(
  championsJson.map((champion) => [champion.id, champion])
);

export const jobs = new Map(jobsJson.map((job) => [job.id, job]));

export const championsJobMap = new Map<string, string[]>(
  championsJson.map((champion) => [champion.id, champion.jobs.map((job) => job)])
);

export const specialMap = new Map(
  specialJson.map((item) => [item.id, item])
);

export const pieces = new Map([...champions, ...specialMap]);

export const jobChampionMap = new Map<string, string[]>(
  jobsJson.map((job) => [job.id, championsJobMap.get(job.id)!])
);

export const jobBounsMap = new Map<string, number[]>(
  jobsJson.map((job) => [job.id, job.bonus])
);

export const noCountJobs = jobsJson.map((job) => job.id).filter((jobId) => jobs.get(jobId)?.bonus.length === 1);

// 英雄相同职业的map
export const championSamepJobMap:Map<string, string[]> = new Map();

function initChampionSampJobMap() {
  for (const [c1Id, c1Jobs] of championsJobMap) {
    const v: { id: string; count: number }[] = [];
    for (const [c2Id, c2Jobs] of championsJobMap) {
      if (c1Id === c2Id) continue;
      const sameJobs = c1Jobs.filter((job) => c2Jobs.includes(job));
      if (sameJobs.length > 0) {
        v.push({
          id: c2Id,
          count: sameJobs.length
        })
      }
    }
    championSamepJobMap.set(c1Id, v.sort((a, b) => b.count - a.count).map((item) => item.id));
  }
}

initChampionSampJobMap();


// 获取英雄的详细信息
export function getChampionDetail(championId: string) {
  return champions.get(championId)?.name;
}

// 获取职业的详细信息
export function getJobDetail(jobId: string) {
  return jobs.get(jobId)!.name;
}

// 去重
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}


// 数学组合 从数组中选择 n 个元素 返回所有可能的组合
function combine<T>(arr: T[], n: number): T[][] {
  const result: T[][] = [];
  const backtrack = (start: number, current: T[]) => {
    if (current.length === n) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  };
  backtrack(0, []);
  return result;
}


export function getJobCount(
  combination: Piece[] // 当前的组合
) {
  const jobCount: Map<string, { id: string; count: number }> = new Map();
  const combinationJobs = combination.map((champion) => champion.jobs).flat();

  for (const job of combinationJobs) {
      if (noCountJobs.includes(job)) continue;

    if (jobCount.has(job)) {
      jobCount.get(job)!.count += 1;
    } else {
      jobCount.set(job, { count: 1, id: job });
    }
    
  }
  return Array.from(jobCount.entries()).map(([id, value]) => ({
    id,
    name: jobs.get(id)!.name,
    count: value.count,
  }));
}

// 计算组合中每个职业的激活状态
export function getActiveJobs(
  combination: Piece[], // 当前的组合
) {


  // Step 1: 计算组合中的职业数量
  const jobCounts = new Map<string, number>(
    getJobCount(combination)?.map((job) => [job.id, job.count])
  );


  // Step 2: 根据职业的 bonus 数组确定是否激活职业
  const activeJobs = new Map<string, number>();

  jobCounts.forEach((count, id) => {
    if (noCountJobs.includes(id)) {
      return;
    }

    const job = jobs.get(id);

    if (!job) {
      return;
    }

    let activatedLevel = 0;

    // 检查当前棋子数量是否达到激活门槛

    for (let i = 0; i < job.bonus.length; i++) {
      if (count >= job.bonus[i]) {
        activatedLevel = i + 1;
      } else {
        break; // 如果当前数量达不到更高门槛，停止检查
      }
    }

    if (activatedLevel > 0) {
      activeJobs.set(id, activatedLevel);
    }

  });

 
  return Array.from(activeJobs.entries()).map(([id, level]) => ({
    id,
    level,
    count: jobCounts.get(id) ?? 0,
  }));
}

export function getActiveJobCount(
  combination: Piece[], // 当前的组合
  activeLevelCounts: boolean = false
) {

  if (activeLevelCounts) {
    return getActiveJobs(combination).reduce((acc, job) => acc + job.level, 0);
  }
  return getActiveJobs(combination).length;
}

// 找到组合中未被激活的职业
export function getInactiveJobs(
  combination: Piece[]
): string[] {
  const jobCount = getJobCount(combination);
  const activeJobCount = getActiveJobs(combination);
 
  return jobCount.filter((job) => activeJobCount.every((activeJob) => activeJob.id !== job.id)).map((job) => job.id);
}



// 判断英雄和组合是否存在相同且未激活的职业
export function hasSameInactiveJob(
  champion: Piece,
  combination: Piece[],
): boolean {
  const inactiveJobs = getInactiveJobs(combination);
  return championsJobMap.get(champion.id)!.some((job) => inactiveJobs.includes(job));
}

// 找到满足必要职业条件的所有组合
export function findAllRequiredCombinations(options: {
  combination: Piece[];
  requiredJob: { id: string; count: number };
}) {
  const { combination: initCombination, requiredJob } = options;

  const jobCount = getJobCount(initCombination);

  const currentCount =
    jobCount.find((job) => job.id === requiredJob.id)?.count ?? 0;

  const availableChampions = jobChampionMap.get(requiredJob.id)?.filter((championId) => !initCombination.includes(championId)) ?? [];

  const diff = requiredJob.count - currentCount;

  if (availableChampions.length < diff) {
    throw new Error(`${requiredJob.id} 数量不足`);
  }

  return combine(availableChampions, diff)

}


// Evaluate 评估当前组合的羁绊数量、单位收益、羁绊总数、羁绊强度
export function evaluateCombination(
  combination: Piece[],
) {
  const activeJobs = getActiveJobs(combination);

  // 激活登记叠加计算为激活数量
  const activeJobCount = getActiveJobCount(combination, true);

  const unitsStrength = new Map<string, number>();

  for (const piece of combination) {
    const unitStrength = Math.pow(global.GAIN_LEVEL, parseFloat(piece!.price) - 1);
    unitsStrength.set(piece.id, unitStrength);
  }

  const championTotalStrength = Array.from(unitsStrength.values()).reduce((acc, strength) => acc + strength, 0);

  
  const jobStrengths = new Map<string, number>();
  for (const activeJob of activeJobs) {
    const currentJob = jobs.get(activeJob.id);
    // 获取当前阵容中该职业的英雄
    const jobChampions = combination.filter((piece) => piece.jobs.includes(activeJob.id));
    const jobStrength = currentJob!.strength[activeJob.level - 1];
    const jobScope = currentJob!.scope[activeJob.level - 1];
    switch (jobScope) {
      case 1: 
        jobStrengths.set(activeJob.id, jobStrength);
        break;
      case 2:
        jobStrengths.set(activeJob.id, jobStrength * jobChampions.length);
        break;
      case 3:
        jobStrengths.set(activeJob.id, jobStrength * combination.length);
        break;
    }
  }

  const totalStrength = Array.from(unitsStrength.values()).reduce((acc, strength) => acc + strength, 0) + Array.from(jobStrengths.values()).reduce((acc, strength) => acc + strength, 0);

  return {
    jobCount: activeJobs.length,
    totalJobCount: activeJobCount,
    championTotalStrength,
    totalStrength,
    jobStrengths: Array.from(jobStrengths.entries()).map(([id, strength]) => ({
      id,
      strength,
    })),
  };
}



export function findMoreActiveJobCombination(options: {
  count: number, 
  combination: Piece[],
}) {
  const { count, combination } = options;

  // 当前组合中的英雄数量
  const championCount = combination.filter((peice) => peice.type === 'champion').length;

  if (championCount >= count) {
    return combination;
  }

  let maxActiveJobCount = 0;
  let maxJobCombination: string[] = [];

  const stack: { node: string; selected: Set<string>; oldChildren: Set<string> }[] = [];

  const initSelected = new Map(combination.map((piece) => [piece.id, piece]))
  const sameChampionIds = combination.flatMap((piece) => {
    if(piece.type === 'champion') {
      return championSamepJobMap.get(piece.id)!.filter((champion) => !initSelected.has(champion))
    }
    const jobs = piece.jobs;
    return jobs.map((job) => (jobChampionMap.get(job) ?? []).filter((champion) => !initSelected.has(champion))).flat();
  })

  const sameChampions = new Set(sameChampionIds);

  // Push initial champions into the stack
  for (const champion of sameChampions) {
    stack.push({
      node: champion,
      selected: new Set(initSelected.keys()),
      oldChildren: new Set([...initSelected.keys()].filter((id) => id !== champion)),
    });
  }

  while (stack.length > 0) {
    const { node, selected, oldChildren } = stack.pop()!;

    const newSelected = new Set(selected);
    newSelected.add(node);

    const newSelectedPieces = Array.from(newSelected).map((id) => {
      if (pieces.has(id)) {
        return pieces.get(id)! as Piece;
      }
      return initSelected.get(id)!;
    });

    const {totalStrength} = evaluateCombination(newSelectedPieces);

    // pecie count
    const championCount = Array.from(newSelected).filter((championId) => champions.has(championId)).length;

    if (championCount === count) {

      // const currentStrength = evaluateCombinationMemoized(newSelected);
      if (totalStrength > maxActiveJobCount) {
        maxActiveJobCount = totalStrength;
        maxJobCombination = Array.from(newSelected);
      }
      continue;
    }

    const newSameJobChampions = new Set(championSamepJobMap.get(node));
    const newChildren = new Set([...oldChildren, ...newSameJobChampions]);
    newChildren.delete(node);

    newSelected.forEach((championId) => {
      newChildren.delete(championId);
    })

    for (const child of newChildren) {
      stack.push({
        node: child,
        selected: new Set(newSelected),
        oldChildren: new Set(newChildren),
      });
    }
  }

  return maxJobCombination.map((id) => pieces.get(id) ?? initSelected.get(id)!);
}


