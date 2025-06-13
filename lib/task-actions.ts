"use server"

import { v4 as uuidv4 } from "uuid"
import type { Task } from "./types"
import { revalidatePath } from "next/cache"

// This is a placeholder for a real database
// In a real application, you would use a proper database
const tasks = new Map<string, Task>()

export async function createTask(taskData: Omit<Task, "id">): Promise<Task> {
  const id = uuidv4()
  const task: Task = {
    id,
    ...taskData,
  }

  tasks.set(id, task)
  revalidatePath("/dashboard")

  return task
}

export async function updateTask(taskData: Task): Promise<Task> {
  const existingTask = tasks.get(taskData.id)

  if (!existingTask) {
    throw new Error("Tâche non trouvée")
  }

  // Check if the user owns the task
  if (existingTask.userId !== taskData.userId) {
    throw new Error("Non autorisé")
  }

  tasks.set(taskData.id, taskData)
  revalidatePath("/dashboard")

  return taskData
}

export async function deleteTask(taskId: string): Promise<void> {
  tasks.delete(taskId)
  revalidatePath("/dashboard")
}

export async function toggleTaskCompletion(taskId: string): Promise<Task> {
  const task = tasks.get(taskId)

  if (!task) {
    throw new Error("Tâche non trouvée")
  }

  const updatedTask = {
    ...task,
    completed: !task.completed,
  }

  tasks.set(taskId, updatedTask)
  revalidatePath("/dashboard")

  return updatedTask
}
