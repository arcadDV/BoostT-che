// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/connectDB';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, password } = await request.json();
    // ... reste de la logique de connexion (voir mes réponses précédentes pour le code complet)
    return NextResponse.json({ message: 'Connexion réussie.' }, { status: 200 });
  } catch (error: any) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json({ message: 'Erreur serveur.' }, { status: 500 });
  }
}