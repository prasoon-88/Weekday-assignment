import { useEffect, useState } from "react";
import { fetchJobs } from "../../app/api";
import { Autocomplete, TextField } from "@mui/material";
import { EXPERIENCE, LOCATION, ROLES, SALARY } from "../../utils/constants";
import JobCard, { Job, LoadingJobCard } from "../../components/jobCard";
import _, { isEmpty } from "lodash";
import "./index.scss";

const Home = () => {
  const [currPage, setCurrPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filterJobs, setFilterJobs] = useState<Job[]>([]);
  const [filterOptions, setFilterOptions] = useState<any>({
    role: [],
    location: [],
    experience: 0,
    salary: 0,
    name: "",
  });

  const handleFilterOptionChange = (key: string, value: any) => {
    const dumpOptions = { ...filterOptions, [key]: value };
    const results: Job[] = jobs.filter((job) => {
      let result = true;
      if (
        job.companyName
          .toLocaleLowerCase()
          .includes(dumpOptions.name.toLocaleLowerCase())
      ) {
        result = result && true;
      } else return false;
    });

    setFilterOptions(dumpOptions);
  };

  const handleFilter = (data: Job[]) => {
    setFilterJobs([...jobs, ...data]);
    setJobs([...jobs, ...data]);
  };

  const getData = async () => {
    setLoading(true);
    const data = await fetchJobs({
      limit: 12,
      offset: currPage,
    });
    handleFilter(data.jdList);
    setLoading(false);
  };

  const handleScroll = _.debounce(() => {
    try {
      const isAtBottom =
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight;
      if (isAtBottom) {
        setCurrPage(currPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currPage]);

  useEffect(() => {
    getData();
  }, [currPage]);
  return (
    <div id="home">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <header className="filterHead">
              <section className="roles">
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={ROLES}
                  getOptionLabel={(option) => option.label}
                  filterSelectedOptions
                  sx={{
                    width: "105%",
                  }}
                  onChange={(e, value) =>
                    handleFilterOptionChange("role", value)
                  }
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Roles" />
                  )}
                />
              </section>
              <section className="location">
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={LOCATION}
                  getOptionLabel={(option) => option.label}
                  filterSelectedOptions
                  size="small"
                  onChange={(e, value) =>
                    handleFilterOptionChange("location", value)
                  }
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Location" />
                  )}
                />
              </section>
              <section className="location">
                <Autocomplete
                  id="filter-demo"
                  options={EXPERIENCE}
                  getOptionLabel={(option) => String(option.label)}
                  sx={{ width: 150 }}
                  size="small"
                  onChange={(e, value) =>
                    handleFilterOptionChange("experience", value)
                  }
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Experience" />
                  )}
                />
              </section>
              <section className="location">
                <Autocomplete
                  id="filter-demo"
                  options={SALARY}
                  getOptionLabel={(option) => String(option.label)}
                  sx={{ width: 250 }}
                  size="small"
                  onChange={(e, value) =>
                    handleFilterOptionChange("salary", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Minimum Base Pay Salary"
                    />
                  )}
                />
              </section>
              <section className="location">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  onChange={(e) =>
                    handleFilterOptionChange("name", e.target.value)
                  }
                  placeholder="Search Company Name"
                />
              </section>
            </header>

            <main>
              {filterJobs?.map((job: Job) => (
                <JobCard key={job?.jdUid} data={job} />
              ))}
              {loading ? (
                Array.from(new Array(12)).map((job, index) => (
                  <LoadingJobCard key={index} />
                ))
              ) : (
                <></>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
