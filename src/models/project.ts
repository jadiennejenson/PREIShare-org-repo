export type ProjectStatus = "planned" | "active" | "blocked" | "done";

export interface Project {
  readonly id: string;
  name: string;
  status: ProjectStatus;
  dueDate?: string;
  tags: string[]; // Required field
  notes?: string; // Optional field
}

export const projects: Project[] = [
  {
    id: "p-1001",
    name: "Client Onboarding Flow",
    status: "active",
    dueDate: "2025-02-15",
    tags: ["frontend", "ux"],
    // notes is optional, so it can stay missing
  }
];