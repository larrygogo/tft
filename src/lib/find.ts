import championsJson from "@/data/champions.json" assert { type: 'json' } ;
import jobsJson from "@/data/jobs.json" assert { type: 'json' } ;

const global = {
  GAIN_LEVEL: 1.25
}

export type Job = {
  id: string;
  name: string;
  type: string;
  bonus: number[];
  scope: number[];
  strength: number[];
};

export type Champion = {
  id: string;
  name: string;
  title: string;
  price: string;
  jobs: string[];
};

export type WoodPile = {
  jobs: string[];
};

export type Combination = (Champion & WoodPile)[];



export const champions = new Map(
  championsJson.map((champion) => [champion.id, champion])
);

export const jobs = new Map((jobsJson as Job[]).map((job) => [job.id, job]));

export const championsJobMap = new Map<string, string[]>(
  championsJson.map((champion) => [champion.id, champion.jobs.map((job) => job)])
);

export const jobChampionMap = new Map<string, string[]>(
  jobsJson.map((job) => [job.id, championsJobMap.get(job.id)!])
);

export const jobBounsMap = new Map<string, number[]>(
  jobsJson.map((job) => [job.id, job.bonus])
);

export const noCountJobs = jobsJson.map((job) => job.id).filter((jobId) => jobs.get(jobId)?.bonus.length === 1);

// 英雄相同职业的map
export const championSampJobMap:Map<string, string[]> = new Map();

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
    championSampJobMap.set(c1Id, v.sort((a, b) => b.count - a.count).map((item) => item.id));
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


// 计算组合中的职业数量
export function getJobCount(
  combination: string[] // 当前的组合
) {
  const jobCount: Map<string, { id: string; count: number }> = new Map();
  const combinationJobs = combination.map((championId) => champions.get(championId)!.jobs).flat();

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
    count: value.count,
  }));
}

export function getJobCount2(
  combination: Champion[] // 当前的组合
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
  combination: string[], // 当前的组合
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
    name: jobs.get(id)!.name,
    level,
    count: jobCounts.get(id) ?? 0,
  }));
}

export function getActiveJobCount(
  combination: string[], // 当前的组合
  activeLevelCounts: boolean = false
) {

  if (activeLevelCounts) {
    return getActiveJobs(combination).reduce((acc, job) => acc + job.level, 0);
  }
  return getActiveJobs(combination).length;
}

// 找到组合中未被激活的职业
export function getInactiveJobs(
  combination: string[], // 当前的组合
): string[] {
  const jobCount = getJobCount(combination);
  const activeJobCount = getActiveJobs(combination);
 
  return jobCount.filter((job) => activeJobCount.every((activeJob) => activeJob.id !== job.id)).map((job) => job.id);
}



// 判断英雄和组合是否存在相同且未激活的职业
export function hasSameInactiveJob(
  champion: string,
  combination: string[],
): boolean {
  const inactiveJobs = getInactiveJobs(combination);
  return championsJobMap.get(champion)!.some((job) => inactiveJobs.includes(job));
}

// 找到满足必要职业条件的所有组合
export function findAllRequiredCombinations(options: {
  combination: string[]; // 初始组合
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
  combination: string[],
) {
  const activeJobs = getActiveJobs(combination);

  // 激活登记叠加计算为激活数量
  const activeJobCount = getActiveJobCount(combination, true);

  const unitsStrength = new Map<string, number>();

  for (const championId of combination) {
    const champion = champions.get(championId);
    const unitStrength = Math.pow(global.GAIN_LEVEL, parseFloat(champion!.price) - 1);
    unitsStrength.set(championId, unitStrength);
  }

  const championTotalStrength = Array.from(unitsStrength.values()).reduce((acc, strength) => acc + strength, 0);

  
  const jobStrengths = new Map<string, number>();
  for (const activeJob of activeJobs) {
    const currentJob = jobs.get(activeJob.id);
    // 获取当前阵容中该职业的英雄
    const jobChampions = combination.filter((championId) => championsJobMap.get(championId)!.includes(activeJob.id));
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


const memo = new Map<string, number>();

function evaluateCombinationMemoized(selected: Set<string>): number {
  const key = [...selected].sort().join('-');
  if (memo.has(key)) {
    return memo.get(key)!;
  }
  const strength = evaluateCombination([...selected]); // Assume evaluateCombination is a function that calculates strength
  memo.set(key, strength.totalStrength);
  return strength.totalStrength;
}


export function findMoreActiveJobCombination(options: {
  count: number, 
  combination: string[],
  activeLevelCounts: boolean
}) {
  const { count, combination } = options;
  let maxActiveJobCount = -Infinity;
  let maxJobCombination: string[] = [];

  const stack: { node: string; selected: Set<string>; oldChildren: Set<string> }[] = [];

  const initSelected = new Set(combination);
  const sameChampionsArray = combination.map((champion) => championSampJobMap.get(champion)!).flat().filter((champion) => !initSelected.has(champion));

  const sameChampions = new Set(sameChampionsArray);

  console.log([...sameChampions].map((championId) => getChampionDetail(championId)));


  // Push initial champions into the stack
  for (const champion of sameChampions) {
    stack.push({
      node: champion,
      selected: initSelected,
      oldChildren: new Set([...initSelected].filter((id) => id !== champion)),
    });
  }

  while (stack.length > 0) {
    const { node, selected, oldChildren } = stack.pop()!;

    const newSelected = new Set(selected);
    newSelected.add(node);

    const {totalStrength} = evaluateCombination([...newSelected]);
    

    if (newSelected.size === count) {

      // const currentStrength = evaluateCombinationMemoized(newSelected);
      if (totalStrength > maxActiveJobCount) {
        maxActiveJobCount = totalStrength;
        maxJobCombination = Array.from(newSelected);
      }
      continue;
    }

    const newSameJobChampions = new Set(championSampJobMap.get(node));
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

  return maxJobCombination;
}


