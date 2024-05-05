export interface DropdownProps {
  label: string | number;
  value: string | number;
}

export const ROLES = [
  {
    label: "Frontend",
    value: "frontend",
  },
  {
    label: "Backend",
    value: "backend",
  },
  {
    label: "Ios",
    value: "ios",
  },
  {
    label: "Android",
    value: "android",
  },
  {
    label: "Tech Lead",
    value: "tech lead",
  },
  {
    label: "React Native",
    value: "react native",
  },
  {
    label: "Hr",
    value: "hr",
  },
  {
    label: "Designer",
    value: "designer",
  },
];

export const LOCATION = [
  {
    label: "Remote",
    value: "remote",
  },
  {
    label: "Hybrid",
    value: "hybrid",
  },
  {
    label: "In-office",
    value: "in-office",
  },
];

const EXPERIENCE: DropdownProps[] = [];

for (let i = 1; i <= 10; i++) {
  EXPERIENCE.push({
    label: i,
    value: i,
  });
}

export const SALARY = [
  {
    label: "0L",
    value: 0,
  },
  {
    label: "10L",
    value: 10,
  },
  {
    label: "20L",
    value: 20,
  },
  {
    label: "30L",
    value: 30,
  },
  {
    label: "40L",
    value: 40,
  },
  {
    label: "50L",
    value: 50,
  },
  {
    label: "60L",
    value: 60,
  },

  {
    label: "70L",
    value: 70,
  },
];
export { EXPERIENCE };
