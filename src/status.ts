export type ProjectStatus = "draft" | "active" | "paused" | "completed";

export type StatusInput = ProjectStatus | string | null | undefined;

export type DraftProject = {
  id: string;
  name: string;
  status: "draft";
  lastEditedAt: string;
};

export type ActiveProject = {
  id: string;
  name: string;
  status: "active";
  etaDays: number;
};

export type PausedProject = {
  id: string;
  name: string;
  status: "paused";
  pauseReason: string;
};

export type CompletedProject = {
  id: string;
  name: string;
  status: "completed";
  completedAt: string;
};

export type ProjectRecord =
  | DraftProject
  | ActiveProject
  | PausedProject
  | CompletedProject;

export function formatProjectRecord(p: ProjectRecord): string {
  switch (p.status) {
    case "draft":
      return `${p.name} (Draft) — last edited ${p.lastEditedAt}`;
    case "active":
      return `${p.name} (Active) — ETA ${p.etaDays} days`;
    case "paused":
      return `${p.name} (Paused) — reason: ${p.pauseReason}`;
    case "completed":
      return `${p.name} (Completed) — done on ${p.completedAt}`;
  }
}

const allowedStatuses: readonly ProjectStatus[] = [
  "draft",
  "active",
  "paused",
  "completed",
] as const;

export function normalizeStatus(input: StatusInput): ProjectStatus | null {
  // Handle null/undefined early
  if (input == null) return null;

  // If it's already a ProjectStatus, it's safe.
  // But at runtime it's still just a string, so we validate with a list.
  if (typeof input === "string") {
    const trimmed = input.trim().toLowerCase();
    if ((allowedStatuses as readonly string[]).includes(trimmed)) {
      return trimmed as ProjectStatus;
    }
  }

  return null;
}
export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
};

export const projectA: Project = {
  id: "p1",
  name: "Client Website Redesign",
  status: "active",
};

// ❌ Intentionally wrong to demonstrate safety:
export const projectB: Project = {
  id: "p2",
  name: "Mobile App",
  // @ts-expect-error - "archived" is not part of ProjectStatus
  status: "archived",
};

export function statusLabelIf(status: ProjectStatus): string {
  if (status === "draft") return "Draft (not visible to client)";
  if (status === "active") return "Active (in progress)";
  if (status === "paused") return "Paused (waiting)";
  // By process of elimination, TypeScript can infer this is "completed"
  return "Completed (delivered)";
}

function assertNever(value: never): never {
  throw new Error("Unhandled case: " + value);
}

export function statusLabelSwitch(status: ProjectStatus): string {
  switch (status) {
    case "draft":
      return "Draft (not visible to client)";
    case "active":
      return "Active (in progress)";
    case "paused":
      return "Paused (waiting)";
    case "completed":
      return "Completed (delivered)";
    default:
      // If you add a new status to ProjectStatus and forget to handle it,
      // TypeScript will error here because `status` won't be `never` anymore.
      return assertNever(status);
  }
}

export function canEditProject(status: ProjectStatus): boolean {
  // Client story rule example: completed projects are read-only.
  return status !== "completed";
}