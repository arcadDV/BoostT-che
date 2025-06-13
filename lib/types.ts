export interface Task {
  id: string
  title: string
  description?: string
  dueDate: Date | string
  priority: "low" | "medium" | "high"
  completed: boolean
  userId: string
}

export interface User {
  id: string
  email: string
}

export interface Session {
  user: User
  expiresAt: Date
}
