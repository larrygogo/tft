export interface Champion {
  name: string;
  title: string;
  price: string;
  id: string;
  jobs: string[];
  special: boolean;
}

export interface Job {
  name: string;
  type: JobType;
  id: string;
}

export type JobType = "classes" | "origins";
