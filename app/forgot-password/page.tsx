import Link from "next/link"
import { ForgotPasswordForm } from "@/components/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Mot de passe oublié</h1>
            <p className="text-gray-500 dark:text-gray-400">Entrez votre email pour réinitialiser votre mot de passe</p>
          </div>
          <ForgotPasswordForm />
          <div className="text-center text-sm">
            <Link href="/login" className="underline">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
