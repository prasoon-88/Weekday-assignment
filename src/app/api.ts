import { APIS } from "./urls";

export type Method = "POST" | "GET";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const generateBody = (payload) => {
  const result = JSON.stringify(payload);
  return result;
};

const generateRequestedOptions = (method: Method, payload: any) => {
  return {
    method,
    headers: myHeaders,
    body: generateBody(payload),
  };
};

export const fetchJobs = async (payload: any) => {
  try {
    const resp = await fetch(
      APIS.getJobs,
      generateRequestedOptions("POST", payload)
    );
    const data = await resp.text();
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};
