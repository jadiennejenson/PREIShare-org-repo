const ownerEmail: string = "sam@company.com";
const maxCollaborators: number = 10;
const isArchived: boolean = false;

const lastSyncedAt: Date = new Date("2024-06-01T12:00:00Z");
const projectDescription: string = "This is a sample project description.";

const projectId: string = "proj-123";
const projectName: string = "Project Tracker";
const taskCount: number = 5;
const isActive: boolean = true;

console.log({ ownerEmail, maxCollaborators, isArchived, lastSyncedAt, projectDescription });
let completedTasks = 1;
completedTasks = completedTasks + 1; // OK

// When starting "empty", annotate your intent
let priority: "low" | "medium" | "high" = "medium";
priority = "high"; // OK
// priority = "urgent"; // ❌ Error: Type '"urgent"' is not assignable to type '"low" | "medium" | "high"'.

console.log({ completedTasks, priority });
const totalTasks: number = 12;
const doneTasks: number = 5;

const percentComplete: number = Math.round((doneTasks / totalTasks) * 100);
const statusLabel: string = isActive ? "Active" : "Paused";

const summaryLine: string = `${projectName} (${statusLabel}) - ${percentComplete}% complete`;
console.log(summaryLine);

// Example comparison
const isFullyDone: boolean = doneTasks === totalTasks;
console.log({ isFullyDone });

export const trackerCard = {
  projectId,
  projectName,
  taskCount,
  isActive,
  priority,
};