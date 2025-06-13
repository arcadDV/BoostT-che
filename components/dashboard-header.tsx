"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User, Plus, Search, Bell, CheckCircle2, Building2 } from "lucide-react"
import { logout } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  user: {
    id: string
    email: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/login")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 glass-pro border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="container-pro flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-slate-900 dark:text-white">BoostTâche</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">ENTERPRISE</span>
            </div>
          </Link>

          <div className="hidden lg:flex relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Rechercher projets, tâches, équipes..."
              className="pl-12 w-[350px] bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 focus:border-blue-500/50 rounded-xl"
            />
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex gap-2 rounded-xl border-slate-200 dark:border-slate-700"
          >
            <Plus className="h-4 w-4" />
            <span>Nouveau projet</span>
          </Button>

          <Button variant="ghost" size="icon" className="lg:hidden rounded-xl">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="rounded-xl relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
              3
            </Badge>
          </Button>

          <Button variant="ghost" size="icon" className="rounded-xl">
            <Building2 className="h-5 w-5" />
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-xl border-slate-200 dark:border-slate-700">
                <User className="h-5 w-5" />
                <span className="sr-only">Menu utilisateur</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 glass-pro rounded-xl border-slate-200/50 dark:border-slate-700/50"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-semibold leading-none">Compte Enterprise</p>
                  <p className="text-xs leading-none text-slate-600 dark:text-slate-400">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      Admin
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Pro Plan
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center cursor-pointer">
                  <User className="mr-3 h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center cursor-pointer">
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Paramètres</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin" className="flex items-center cursor-pointer">
                  <Building2 className="mr-3 h-4 w-4" />
                  <span>Administration</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center cursor-pointer text-red-600 dark:text-red-400"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
