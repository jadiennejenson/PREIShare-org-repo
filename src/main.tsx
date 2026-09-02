import "./style.css";
import { sampleProjects, validateProject } from "./project-tracker";
import { summarizeTask, sumHours, getTaskHours, type Task } from './helpers'

const tasks: Task[] = [
  { name: 'Fix login bug', project: 'Website Redesign', hours: 2.5, assignee: 'Sam', status: 'done' },
  { name: 'Write status report', project: 'Website Redesign', assignee: undefined, status: 'open' },
  { name: 'Plan sprint', project: 'Internal', hours: 1 }
]

for (const t of tasks) {
  console.log(summarizeTask(t))
}

const total = sumHours(tasks.map(getTaskHours))
console.log('Total tracked hours:', total)

type ProjectStatus = "draft" | "active" | "blocked" | "in_review" | "done";

type Project = {
  id: string;
  title: string;
  status: ProjectStatus;
  // These are the “completeness” fields we’ll validate
  ownerEmail?: string;
  estimatedHours?: number; // important: 0 is a valid number, but it's falsy
  description?: string;
};

const projects: Project[] = [
  {
    id: "p1",
    title: "Client onboarding flow",
    status: "draft",
    ownerEmail: "pm@company.com",
    estimatedHours: 12,
    description: "Define steps and screens",
  },
  {
    id: "p2",
    title: "Bug bash",
    status: "active",
    ownerEmail: "qa@company.com",
    estimatedHours: 0, // intentionally 0 to test truthiness pitfalls
    description: "One-day bug cleanup",
  },
  {
    id: "p3",
    title: "New landing page",
    status: "blocked",
    // missing ownerEmail
    estimatedHours: 8,
    description: "Waiting on brand assets",
  },
];

type NextAction =
  | "Fix missing info"
  | "Start project"
  | "Unblock project"
  | "Submit for review"
  | "Archive"
  | "No action";

function hasRequiredInfo(p: Project): boolean {
  // For the tracker, assume these are required to move forward:
  // - ownerEmail must be a non-empty string
  // - estimatedHours must be a number (0 is allowed, but null/undefined is not)
  // - description must be a non-empty string

  const hasOwner = typeof p.ownerEmail === "string" && p.ownerEmail.trim().length > 0;
  const hasEstimate = p.estimatedHours != null; // true for 0, false for null/undefined
  const hasDescription = typeof p.description === "string" && p.description.trim().length > 0;

  return hasOwner && hasEstimate && hasDescription;
}

function demoTruthiness() {
  const values = ["", "hello", 0, 5, null, undefined, NaN, [], {}, "0"];

  for (const v of values) {
    // Stringify carefully so you can “see” values like NaN and empty string
    const label = typeof v === "string" ? `"${v}"` : String(v);
    console.log(label.padEnd(12), "=>", v ? "truthy" : "falsy");
  }

  // Safe patterns
  const hours = 0;
  console.log("hours is missing?", hours == null); // false
  console.log("hours is falsy?", !hours); // true (this is why naive checks break)

  const email = "   ";
  console.log("email provided?", typeof email === "string" && email.trim().length > 0);
}

demoTruthiness();

function getStatusLabel(p: Project): string {
  // Simple mapping based on one condition
  return p.status === "blocked" ? "Blocked (needs attention)" : `Status: ${p.status}`;
}

function shouldShowWarning(p: Project): boolean {
  // Another simple condition: warn if missing info OR blocked
  return !hasRequiredInfo(p) ? true : p.status === "blocked";
}

for (const p of projects) {
  console.log(
    `[${p.id}] label=`,
    getStatusLabel(p),
    "warning=",
    shouldShowWarning(p)
  );
}

function assertNever(value: never, message: string): never {
  throw new Error(`${message}: ${value}`);
}

function getNextAction(p: Project): NextAction {
  if (!hasRequiredInfo(p)) {
    return "Fix missing info";
  }

  switch (p.status) {
    case "draft":
      return "Start project";
    case "blocked":
      return "Unblock project";
    case "active":
      return "Submit for review";
    case "in_review":
      return "Archive";
    case "done":
      return "No action";
    default:
      // If ProjectStatus ever changes, TypeScript will push you to update this switch.
      return assertNever(p.status, "Unhandled project status");
  }
}

for (const p of projects) {
  console.log(`[${p.id}] ${p.title} ->`, getNextAction(p));
}


console.log("Loaded projects:", projects);

// Uncomment to see TypeScript protect you (then comment back)
// console.log(sumHours(['1', '2']))


const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Missing #app element");

app.innerHTML = `
  <h1>Project Tracker Checks</h1>
  <p>Open the browser console to see validation output.</p>
`;

console.log("--- Validating sampleProjects ---");
for (const p of sampleProjects) {
  const result = validateProject(p);
  console.log(p.id, result.ok ? "OK" : result);
}

console.log("--- Validating intentionally bad input ---");
const badInput: unknown = {
  id: "", // invalid
  name: "  ", // invalid
  owner: 42, // invalid type
  status: "in-progress", // not allowed
  estimateHours: -5, // invalid
  notes: "" // invalid when provided
};

const badResult = validateProject(badInput);
console.log(badResult);
