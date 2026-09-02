import type { Project, ProjectStatus } from "../models/project";

export function upcomingDeadlines(projects: Project[]): Project[] {
  // Business rule: only projects that actually have a due date belong here
  return projects.filter((p) => p.dueDate !== undefined);
}

export function printDueDateUnsafe(project: Project): string {
  // Deliberate optional-property mistake (uncomment to see the error):
  // return project.dueDate.toUpperCase();
  // Error: Object is possibly 'undefined'.

  // Correct approach:
  return project.dueDate ? project.dueDate.toUpperCase() : "NO DUE DATE";
}

export function getProjectsByStatus(
  projects: Project[],
  status: ProjectStatus
): Project[] {
  return projects.filter((p) => p.status === status);
}

export function countByStatus(
  projects: Project[],
  status: ProjectStatus
): number {
  return getProjectsByStatus(projects, status).length;
}

export function formatDueDate(project: Project): string {
  // Optional property: we must handle the "missing" case
  if (!project.dueDate) return "No due date";
  return project.dueDate;
}