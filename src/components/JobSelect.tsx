import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import jobsJson from "@/data/jobs.json";
import { useMemo } from "react";

interface JobSelectProps {
  scope: 'classes' | 'origins' | 'all';
  placeholder?: string;
  value: string | undefined;
  onValueChange: (value: string) => void;
  showAll?: boolean;
}

const JobSelect = (props: JobSelectProps) => {
  const { scope, value, onValueChange, placeholder, showAll } = props;

  const jobs = useMemo(() => {
    if (scope === 'all') {
      return jobsJson;
    }
    return jobsJson.filter((job) => job.type === scope);
  }, [scope]);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full focus:ring-0 hover:border-yellow-500 hover:z-[2]">
        {(value === "all" || value === undefined) ? (
          <span>
            {placeholder ?? '请选择'}
          </span>
        ) : (
          <SelectValue>
            {jobs.find((job) => job.id === value)?.name}
          </SelectValue>
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          { showAll && (
            <SelectItem value="all">全部</SelectItem>
          )}
          {jobs.map((job) => (
            <SelectItem key={job.id} value={job.id}>
              {job.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default JobSelect;
