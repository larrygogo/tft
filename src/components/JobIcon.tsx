import Icon10087 from "@/assets/svg/job/10087.svg?react";
import Icon10088 from "@/assets/svg/job/10088.svg?react";
import Icon10089 from "@/assets/svg/job/10089.svg?react";
import Icon10090 from "@/assets/svg/job/10090.svg?react";
import Icon10091 from "@/assets/svg/job/10091.svg?react";
import Icon10092 from "@/assets/svg/job/10092.svg?react";
import Icon10093 from "@/assets/svg/job/10093.svg?react";
import Icon10094 from "@/assets/svg/job/10094.svg?react";
import Icon10095 from "@/assets/svg/job/10095.svg?react";
import Icon10096 from "@/assets/svg/job/10096.svg?react";
import Icon10097 from "@/assets/svg/job/10097.svg?react";
import Icon10098 from "@/assets/svg/job/10098.svg?react";
import Icon10099 from "@/assets/svg/job/10099.svg?react";
import Icon10101 from "@/assets/svg/job/10101.svg?react";
import Icon10102 from "@/assets/svg/job/10102.svg?react";
import Icon10103 from "@/assets/svg/job/10103.svg?react";
import Icon10104 from "@/assets/svg/job/10104.svg?react";
import Icon10105 from "@/assets/svg/job/10105.svg?react";
import Icon10106 from "@/assets/svg/job/10106.svg?react";
import Icon10107 from "@/assets/svg/job/10107.svg?react";
import Icon10108 from "@/assets/svg/job/10108.svg?react";
import Icon10109 from "@/assets/svg/job/10109.svg?react";
import Icon10110 from "@/assets/svg/job/10110.svg?react";
import Icon10111 from "@/assets/svg/job/10111.svg?react";
import Icon10112 from "@/assets/svg/job/10112.svg?react";
import Icon10113 from "@/assets/svg/job/10113.svg?react";
import Icon10114 from "@/assets/svg/job/10114.svg?react";

const jobIcons: Record<string, React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
  title?: string;
}>> = {
  "10087": Icon10087,
  "10088": Icon10088,
  "10089": Icon10089,
  "10090": Icon10090,
  "10091": Icon10091,
  "10092": Icon10092,
  "10093": Icon10093,
  "10094": Icon10094,
  "10095": Icon10095,
  "10096": Icon10096,
  "10097": Icon10097,
  "10098": Icon10098,
  "10099": Icon10099,
  "10101": Icon10101,
  "10102": Icon10102,
  "10103": Icon10103,
  "10104": Icon10104,
  "10105": Icon10105,
  "10106": Icon10106,
  "10107": Icon10107,
  "10108": Icon10108,
  "10109": Icon10109,
  "10110": Icon10110,
  "10111": Icon10111,
  "10112": Icon10112,
  "10113": Icon10113,
  "10114": Icon10114,
};

interface JobIconProps extends React.SVGProps<SVGSVGElement> {
  jobId: string;
}

const JobIcon = (props: JobIconProps) => {
  const {jobId, ...rest} = props;

  const Icon = jobIcons[jobId];

  return (
    <svg
      width="30"
      height="30"
      className=" m-[-2px] aspect-square undefined w-[30px]"
      viewBox="-4 -2 36 36"
      {...rest}
    >
      <path
        fill="#111"
        d="M13.856406460551018 0L27.712812921102035 8L27.712812921102035 24L13.856406460551018 32L0 24L0 8Z"
      ></path>
      <path
        transform="translate(2, 2.5)"
        stroke="#555"
        stroke-width="1.5"
        fill="transparent"
        d="M11.90784930203603 0L23.81569860407206 6.875L23.81569860407206 20.625L11.90784930203603 27.5L0 20.625L0 6.875Z"
      ></path>
      {Icon && <Icon x={4.25} y={6.25} width={19.5} height={19.5} fill="#fff"/>}
    </svg>
  );
};

export default JobIcon;
