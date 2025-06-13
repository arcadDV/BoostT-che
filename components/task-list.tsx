"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Pencil, Trash2, Calendar, CheckCircle2, Clock, Filter, TrendingUp, Target, Zap } from "lucide-react"
import { TaskDialog } from "@/components/task-dialog"
import { DeleteTaskDialog } from "@/components/delete-task-dialog"
import type { Task } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TaskListProps {
  initialTasks: Task[]
  userId: string
}

export function TaskList({ initialTasks, userId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const [priorityFilter, setPriorityFilter] = useState<"all" | "low" | "medium" | "high">("all")

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filter === "all" ? true : filter === "active" ? !task.completed : task.completed
    const priorityMatch = priorityFilter === "all" ? true : task.priority === priorityFilter
    return statusMatch && priorityMatch
  })

  const handleCreateTask = (newTask: Task) => {
    setTasks([...tasks, newTask])
    setIsCreateDialogOpen(false)
  }

  const handleEditTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setIsEditDialogOpen(false)
    setCurrentTask(null)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    setIsDeleteDialogOpen(false)
    setCurrentTask(null)
  }

  const handleToggleComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed }
        }
        return task
      }),
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "priority-badge priority-high"
      case "medium":
        return "priority-badge priority-medium"
      case "low":
        return "priority-badge priority-low"
      default:
        return "priority-badge"
    }
  }

  const getTaskCardClass = (priority: string) => {
    const baseClass = "task-card"
    switch (priority) {
      case "high":
        return `${baseClass} task-card-high`
      case "medium":
        return `${baseClass} task-card-medium`
      case "low":
        return `${baseClass} task-card-low`
      default:
        return baseClass
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Haute"
      case "medium":
        return "Moyenne"
      case "low":
        return "Basse"
      default:
        return "Non définie"
    }
  }

  // Calculer les statistiques
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const activeTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="space-y-12">
      {/* Cartes statistiques élégantes */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 dark:from-blue-950/30 dark:via-blue-900/30 dark:to-blue-950/30 border-blue-200/50 dark:border-blue-800/30 shadow-lg hover:shadow-xl transition-all duration-500 animate-scale-in">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total des tâches</CardTitle>
              <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-4xl font-bold text-blue-800 dark:text-blue-200">{totalTasks}</div>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-2">+2 cette semaine</p>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-green-50 via-green-100 to-green-50 dark:from-green-950/30 dark:via-green-900/30 dark:to-green-950/30 border-green-200/50 dark:border-green-800/30 shadow-lg hover:shadow-xl transition-all duration-500 animate-scale-in"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Terminées</CardTitle>
              <div className="w-10 h-10 bg-green-500/10 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-4xl font-bold text-green-800 dark:text-green-200">{completedTasks}</div>
            <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-2">+5 cette semaine</p>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 dark:from-orange-950/30 dark:via-orange-900/30 dark:to-orange-950/30 border-orange-200/50 dark:border-orange-800/30 shadow-lg hover:shadow-xl transition-all duration-500 animate-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">En cours</CardTitle>
              <div className="w-10 h-10 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-4xl font-bold text-orange-800 dark:text-orange-200">{activeTasks}</div>
            <p className="text-xs text-orange-600/70 dark:text-orange-400/70 mt-2">-3 cette semaine</p>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 dark:from-purple-950/30 dark:via-purple-900/30 dark:to-purple-950/30 border-purple-200/50 dark:border-purple-800/30 shadow-lg hover:shadow-xl transition-all duration-500 animate-scale-in"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Productivité</CardTitle>
              <div className="w-10 h-10 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-4xl font-bold text-purple-800 dark:text-purple-200">{completionRate}%</div>
            <p className="text-xs text-purple-600/70 dark:text-purple-400/70 mt-2">+12% ce mois</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et actions raffinés */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={(value) => setFilter(value as any)}>
            <TabsList className="grid w-full grid-cols-3 sm:w-auto bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
              <TabsTrigger value="all" className="flex items-center gap-2 rounded-xl">
                <Filter className="h-4 w-4" />
                <span>Toutes</span>
              </TabsTrigger>
              <TabsTrigger value="active" className="flex items-center gap-2 rounded-xl">
                <Clock className="h-4 w-4" />
                <span>Actives</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2 rounded-xl">
                <CheckCircle2 className="h-4 w-4" />
                <span>Terminées</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-2"
              >
                <Filter className="h-4 w-4" />
                <span>Priorité</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass rounded-2xl border-gray-200/50 dark:border-gray-700/50">
              <DropdownMenuLabel>Filtrer par priorité</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setPriorityFilter("all")}>Toutes les priorités</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter("high")}>
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                Haute priorité
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter("medium")}>
                <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                Priorité moyenne
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter("low")}>
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Basse priorité
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button onClick={() => setIsCreateDialogOpen(true)} className="btn-primary w-full lg:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle tâche
        </Button>
      </div>

      {/* Grille de tâches */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-600 animate-fade-in-up">
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-3xl flex items-center justify-center">
              <Zap className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-2xl text-gray-900 dark:text-white">Aucune tâche trouvée</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
                {filter === "all"
                  ? "Commencez votre parcours de productivité en créant votre première tâche."
                  : filter === "active"
                    ? "Félicitations ! Toutes vos tâches sont terminées."
                    : "Vous n'avez pas encore terminé de tâches."}
              </p>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="btn-primary">
              <Plus className="mr-2 h-4 w-4" />
              Créer ma première tâche
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
          {filteredTasks.map((task, index) => (
            <Card
              key={task.id}
              className={`${getTaskCardClass(task.priority)} ${task.completed ? "opacity-60" : ""} rounded-3xl`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle
                    className={`text-lg leading-tight font-semibold ${task.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"}`}
                  >
                    {task.title}
                  </CardTitle>
                  <Badge className={getPriorityColor(task.priority)}>{getPriorityLabel(task.priority)}</Badge>
                </div>
              </CardHeader>

              <CardContent className="pb-4">
                <p
                  className={`text-sm leading-relaxed ${task.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-600 dark:text-gray-300"}`}
                >
                  {task.description}
                </p>
                <div className="flex items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between items-center pt-4">
                <Button
                  variant={task.completed ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleToggleComplete(task.id)}
                  className={task.completed ? "rounded-xl" : "bg-green-600 hover:bg-green-700 text-white rounded-xl"}
                >
                  {task.completed ? "Rétablir" : "Terminer"}
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      setCurrentTask(task)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
                    onClick={() => {
                      setCurrentTask(task)
                      setIsDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Dialogs */}
      <TaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSave={handleCreateTask}
        userId={userId}
      />

      {currentTask && (
        <TaskDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          task={currentTask}
          onSave={handleEditTask}
          userId={userId}
        />
      )}

      {currentTask && (
        <DeleteTaskDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          task={currentTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  )
}
