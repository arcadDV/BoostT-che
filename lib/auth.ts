// lib/auth.ts
"use server"; // C'est ESSENTIEL pour les Server Actions et l'accès aux cookies côté serveur

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type AuthActionResult = {
    success: boolean;
    message?: string;
    error?: string;
};

// Gardez register seulement si vous comptez l'utiliser ailleurs pour des Server Actions.
// Si vous utilisez l'API Route (`/api/register`) pour l'enregistrement, cette fonction 'register'
// dans 'auth.ts' est redondante ou doit être adaptée pour un autre usage.
export async function register(userData: any): Promise<AuthActionResult> {
    console.log("Tentative d'enregistrement de l'utilisateur :", userData);
    try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simuler un délai

        if (userData.email === "test@example.com") {
            return { success: false, error: "Cet email est déjà enregistré (simulation)." };
        }

        console.log("Utilisateur enregistré avec succès (simulation) :", userData.email);
        // Appelez createSessionCookie avec await ici
        await createSessionCookie(userData.email, 3600 * 1000);

        return { success: true, message: "Enregistrement réussi (simulation)." };
    } catch (error: any) {
        console.error("Erreur lors de l'enregistrement:", error);
        return { success: false, error: error.message || "Une erreur inattendue est survenue." };
    }
}

export async function getSession() {
  // CORRECTION : Toujours utiliser 'await' avec cookies()
  const cookieStore = await cookies(); // <-- C'EST LA CORRECTION PRINCIPALE ICI
  const sessionToken = cookieStore.get('sessionToken')?.value;

  if (sessionToken) {
    return {
      user: {
        id: "simulated-user-id",
        email: "simulated@example.com",
        name: "Simulated User"
      },
      isLoggedIn: true
    };
  }
  return null;
}

export async function logout(): Promise<AuthActionResult> {
  console.log("Tentative de déconnexion...");
  // CORRECTION : Toujours utiliser 'await' avec cookies()
  const cookieStore = await cookies(); // <-- C'EST LA CORRECTION PRINCIPALE ICI
  cookieStore.delete('sessionToken');
  console.log("Cookie de session supprimé.");
  redirect('/login'); // redirect est une fonction directement appelable
  return { success: true, message: "Déconnexion réussie." };
}

export async function createSessionCookie(userId: string, duration: number): Promise<boolean> {
    console.log(`Création d'un cookie de session simulée pour l'utilisateur ${userId}`);
    // CORRECTION : Toujours utiliser 'await' avec cookies()
    const cookieStore = await cookies(); // <-- C'EST LA CORRECTION PRINCIPALE ICI
    cookieStore.set('sessionToken', 'simulated-jwt-for-' + userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: duration / 1000,
        path: '/',
    });
    console.log("Cookie de session simulé défini.");
    return true;
}

export async function resetPassword(email: string): Promise<AuthActionResult> {
    console.log(`Tentative de réinitialisation du mot de passe pour l'email : ${email}`);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(`Lien de réinitialisation envoyé à ${email} (simulation)`);
    return { success: true, message: "Lien de réinitialisation envoyé (simulation)." };
}