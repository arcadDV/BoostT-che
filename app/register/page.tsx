// 'use client'; // Ce fichier peut rester un Server Component si vous voulez
                // Mais il ne doit plus appeler getSession().

import Link from "next/link";
// import { redirect } from "next/navigation"; // Plus besoin de redirection basée sur la session ici
// import { getSession } from "@/lib/auth"; // Ligne commentée par vous, c'est bien.
import { RegisterForm } from "@/components/register-form"; // Importez correctement votre composant
import { ThemeToggle } from "@/components/theme-toggle"; // Si vous avez ce composant

export default async function RegisterPage() {
  // Supprimez toute la logique de session :
  // const session = await getSession();
  // if (session) {
  //   redirect("/dashboard");
  // }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute right-4 top-4">
        {/* Assurez-vous que ThemeToggle est un 'use client' component si nécessaire */}
        <ThemeToggle />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-8 animate-fade-in-up">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                {/* Assurez-vous que CheckCircle2 est importé de 'lucide-react' et fonctionne */}
                {/* <CheckCircle2 className="h-6 w-6 text-white" /> */}
                {/* Si lucide-react n'est pas configuré ou pose problème, vous pouvez le commenter temporairement */}
                <span className="h-6 w-6 text-white">✅</span> {/* Alternative simple */}
              </div>
              <span className="font-bold text-2xl">BoostTâche</span>
            </Link>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Créer un compte</h1>
              <p className="text-muted-foreground">Rejoignez des milliers d'utilisateurs productifs</p>
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 shadow-medium">
            <RegisterForm /> {/* C'est ici que votre formulaire client sera rendu */}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Vous avez déjà un compte ?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}