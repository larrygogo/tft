export interface Champion {
  name: string;
  title: string;
  price: string;
  id: string;
  jobs: Job[];
}

export interface Job {
  name: string;
  type: JobType;
  id: string;
}

export type JobType = "classes" | "origins";
