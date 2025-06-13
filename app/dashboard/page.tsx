import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth" // L'importation devrait maintenant trouver lib/auth.ts
import { DashboardHeader } from "@/components/dashboard-header"
import { TaskList } from "@/components/task-list"
import { getTasks } from "@/lib/tasks" // Assurez-vous que ce fichier existe et exporte getTasks

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login") // Redirige vers la page de connexion si pas de session
  }

  // Assurez-vous que getTasks est une fonction valide et prend session.user.id
  // Si session.user est null ou undefined, cela causera une erreur ici.
  const tasks = await getTasks(session.user.id) // Utilisez l'ID de l'utilisateur de la session

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-blue-50/20 to-green-50/10 dark:from-gray-900 dark:via-blue-950/20 dark:to-green-950/10">
      <DashboardHeader user={session.user} />

      <main className="flex-1 container py-12">
        <div className="space-y-12">
          <div className="flex items-center justify-between animate-fade-in-up">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-green-700 dark:from-white dark:via-blue-200 dark:to-green-200 bg-clip-text text-transparent">
                Tableau de bord
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Gérez vos tâches avec élégance et efficacité</p>
            </div>
          </div>

          <TaskList initialTasks={tasks} userId={session.user.id} />
        </div>
      </main>

      <footer className="border-t border-gray-200/50 dark:border-gray-700/50 py-8 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-600 dark:text-gray-400 md:text-left">
            © 2024 BoostTâche. Conçu avec passion pour votre productivité.
          </p>
        </div>
      </footer>
    </div>
  )
}