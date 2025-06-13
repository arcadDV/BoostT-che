'use client'; // Indique que c'est un Composant Client

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Pour les redirections

export function RegisterForm() { // Exportation nommée
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });
      setMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      console.log('Inscription réussie:', response.data);
      router.push('/login'); // Redirige vers la page de login
    } catch (error) {
      setMessage(error.response?.data?.errors?.[0]?.msg || error.response?.data?.msg || 'Erreur lors de l\'inscription.');
      console.error('Erreur lors de l\'inscription:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4"> {/* Utilisez vos classes Tailwind ici */}
      <div>
        <label htmlFor="email" className="sr-only">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="email@exemple.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="sr-only">Mot de passe:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Mot de passe"
        />
      </div>
      <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-primary text-primary-foreground hover:bg-primary/90">
        S'inscrire
      </button>
      {message && <p className="text-center text-sm" style={{ color: message.includes('succès') ? 'green' : 'red' }}>{message}</p>}
    </form>
  );
}