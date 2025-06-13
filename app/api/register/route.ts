// app/api/register/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectDB(); // Assurez-vous que la connexion est établie

    // CORRECTION ICI : Déstructurez email et password du corps de la requête
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email et mot de passe sont requis.' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: 'Cet email est déjà enregistré.' },
        { status: 409 } // 409 Conflict pour indiquer que la ressource existe déjà
      );
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    // Optionnel : Générer et définir un cookie de session ici si vous le souhaitez
    // import { cookies } from 'next/headers';
    // const cookieStore = cookies();
    // cookieStore.set('sessionToken', 'your-jwt-token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return NextResponse.json(
      { message: 'Utilisateur enregistré avec succès.' },
      { status: 201 } // 201 Created
    );

  } catch (error: any) {
    console.error('Erreur lors de l\'enregistrement:', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de l\'enregistrement.', error: error.message },
      { status: 500 }
    );
  }
}