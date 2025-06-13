// components/login-form.tsx
'use client'; // ESSENTIEL pour un composant interactif côté client

import * as React from 'react'; // Utilisez React.* pour le JSX
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Pour la redirection après connexion

// Importez vos composants UI si vous les utilisez (ex: Card, Button, Input, Label)
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function LoginForm() { // <-- EXPORT NOMMÉ ICI
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Réinitialise les erreurs

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Connexion réussie:', data.message);
        router.push('/dashboard'); // Redirigez vers le tableau de bord
      } else {
        setError(data.message || 'Erreur lors de la connexion.');
        console.error('Erreur de connexion:', data.message);
      }
    } catch (err: any) {
      setError('Erreur réseau ou autre lors de la connexion: ' + err.message);
      console.error('Erreur de connexion:', err);
    }
  };

  return (
    // Structure JSX du formulaire de connexion
    // Assurez-vous que toutes les balises sont correctement fermées
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Se connecter
      </button>
    </form>
  );
}