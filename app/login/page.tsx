// app/login/page.tsx
import Link from "next/link";
import { LoginForm } from "@/components/login-form"; // Doit être importé avec accolades

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Connexion</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Entrez vos informations pour vous connecter à votre compte.
          </p>
        </div>
        <LoginForm />
        <div className="mt-4 text-center text-sm">
          Pas encore de compte ?{" "}
          <Link href="/register" className="underline">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}