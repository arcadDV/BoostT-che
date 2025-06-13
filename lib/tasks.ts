import type { Task } from "./types"

// This is a placeholder for a real database
// In a real application, you would use a proper database
const tasks = new Map<string, Task>()

export async function getTasks(userId: string): Promise<Task[]> {
  // In a real app, you would query the database for tasks belonging to the user
  return Array.from(tasks.values()).filter((task) => task.userId === userId)
}

export async function getTask(taskId: string): Promise<Task | null> {
  return tasks.get(taskId) || null
}
