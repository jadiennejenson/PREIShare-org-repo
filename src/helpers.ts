export function sumHours(hours: number[]): number {
  // We start at 0 so even an empty array returns 0 (not undefined)
  return hours.reduce((total, h) => total + h, 0)
}

export const formatTaskLabel = (taskName: string, projectName: string): string => {
  return `${projectName}: ${taskName}`
}

export const formatAssignee = (assigneeName?: string): string => {
  if (assigneeName === undefined) {
    return 'Unassigned'
  }

  // Optional: trim to prevent weird spacing in labels
  const clean = assigneeName.trim()
  return clean.length === 0 ? 'Unassigned' : `Assigned to ${clean}`
}

export const formatStatus = (status: string = 'open'): string => {
  // Normalize casing for display
  const clean = status.trim().toLowerCase()
  if (clean === 'in_progress') return 'In Progress'
  if (clean === 'done') return 'Done'
  if (clean === 'blocked') return 'Blocked'
  return 'Open'
}

export function warnIfNegativeHours(hours: number[]): void {
  for (const h of hours) {
    if (h < 0) {
      console.warn(`Suspicious entry: negative hours (${h}). Check your task data.`)
    }
  }
}

export type Task = {
  name: string
  project: string
  hours?: number
  assignee?: string
  status?: string
}

export function getTaskHours(task: Task): number {
  // Default missing hours to 0 to keep totals stable
  return task.hours ?? 0
}

export function summarizeTask(task: Task): string {
  const base = `${task.project}: ${task.name}`
  const statusPart = task.status ? ` [${formatStatus(task.status)}]` : ''
  const assigneePart = ` — ${formatAssignee(task.assignee)}`
  const hoursPart = ` — ${getTaskHours(task)}h`
  return base + statusPart + assigneePart + hoursPart
}
