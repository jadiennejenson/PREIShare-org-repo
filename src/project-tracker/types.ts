export type ProjectStatus = "planned" | "active" | "done";

export interface Project {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  /** Estimated effort in hours */
  estimateHours: number;
  /** Optional notes (can be missing) */
  notes?: string;
}
