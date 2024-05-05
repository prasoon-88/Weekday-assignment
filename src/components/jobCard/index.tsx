import { Button, Chip } from "@mui/material";
import { capitalizeWords, ensureWWW, getLabels } from "../../utils";
import { ROLES } from "../../utils/constants";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "./index.scss";

export interface Job {
  jdUid: string;
  jdLink: string;
  jobDetailsFromCompany: string;
  maxJdSalary: number;
  minJdSalary: number;
  salaryCurrencyCode: string;
  location: string;
  minExp: number;
  maxExp: number;
  jobRole: string;
  companyName: string;
  logoUrl: string;
}

interface JobCardProp {
  data: Job;
}

const JobCard = ({ data }: JobCardProp) => {
  return (
    <div id="jobCard" className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div>
        <Chip
          size="small"
          label={<span className="fs-9 lh-13">⏳ Posted 4 days ago</span>}
        />
      </div>
      <section className="companyDescription mt-12">
        <div className="companyLogo">
          <img src={data?.logoUrl} alt="Logo" />
        </div>
        <div>
          <div className="companyName">{data?.companyName}</div>
          <div className="role">{getLabels(data?.jobRole, ROLES)}</div>
          <div className="location">
            {capitalizeWords(data?.location)} | Exp:{" "}
            {`${data?.minExp ? data?.minExp : 0} - ${
              data?.maxExp ? data?.maxExp : 0
            }`}{" "}
            years
          </div>
        </div>
      </section>
      <section className="fs-14 lh-20 font-400 salary">
        Estimated Salary: ₹{data.maxJdSalary}{" "}
        {data.minJdSalary ? "-" + data.minJdSalary : ""}{" "}
        {capitalizeWords(data?.salaryCurrencyCode)} ✅
      </section>

      <div>
        <div className="fs-16 lh-22 font-500">About Company:</div>
        <div className="fs-14 lh-20 font-600">About us</div>
        <div className="fs-14 lh-20 font-500 jobDescription">
          <div className="shade">View Job</div>
          {data?.jobDetailsFromCompany ? data?.jobDetailsFromCompany : ""}
        </div>
        <div className="mt-16">
          <div className="fs-13 font-600" style={{ color: "#8b8b8b" }}>
            Minimum Experience
          </div>
          <div className="fs-14 font-500">5 years</div>
        </div>

        <Link to={ensureWWW(data?.jdLink)} target="_blank">
          <Button
            color="success"
            style={{
              background: "rgb(85, 239, 196)",
              width: "100%",
              marginTop: "24px",
            }}
          >
            <i className="material-icons fs-20" style={{ color: "#fd0" }}>
              electric_bolt
            </i>
            <span className="font-600 text-dark ml-8">Easy Apply</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const LoadingJobCard = () => {
  return (
    <div
      id="jobCard"
      className="col-12 col-md-6 col-lg-4 col-xl-3"
      style={{ gap: "auto" }}
    >
      <Skeleton width={"100%"} height={"calc(100% - 16px)"} borderRadius={12}/>
    </div>
  );
};

export default JobCard;
