// Cette page peut rester un Server Component, pas besoin de 'use client' ici
// si elle ne contient pas d'interactions client directes non gérées par des composants enfants.

import Link from "next/link";
// import { redirect } from "next/navigation"; // Laisser cette ligne commentée ou la supprimer si vous ne l'utilisez pas ailleurs

// Suppression de l'ancienne importation d'authentification:
// import { getSession } from "@/lib/auth"; // <-- Cette ligne N'EXISTE PLUS

// Importez vos composants d'UI si nécessaire (ex: si vous utilisez Shadcn UI)
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle"; // Assurez-vous que ThemeToggle est un 'use client' component
import Image from "next/image"; // Exemple, si vous avez une image sur la page d'accueil
import { // Gardez les icônes que vous utilisez réellement
  CheckCircle2,
  Calendar,
  Users,
  Zap,
  Shield,
  Smartphone,
  ArrowRight,
  Play,
  Star,
  Quote,
  Coffee,
  Heart,
  Lightbulb,
} from "lucide-react"


export default async function HomePage() { // Renommé Home en HomePage pour clarté si vous avez un composant Home ailleurs
  // Suppression de toute logique de session basée sur getSession():
  // const session = await getSession(); // <-- CETTE LIGNE EST SUPPRIMÉE
  // if (session) {                     // <-- CE BLOC IF EST SUPPRIMÉ
  //   redirect("/dashboard");
  // }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header authentique */}
      <header className="fixed top-0 w-full z-50 glass-pro border-b border-white/10">
        <div className="container-pro h-18 flex items-center justify-between">
          <Link className="flex items-center space-x-3" href="/">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-slate-900 dark:text-white">BoostTâche</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">Fait avec ❤️ pour vous</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="#story"
              className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
            >
              Notre Histoire
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
            >
              Témoignages
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
            >
              Tarifs
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-700 hover:text-blue-600 dark:text-slate-300">
                Se connecter
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                Essayer gratuitement
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-18">
        {/* Hero Section avec image d'arrière-plan */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* NOUVEAU: Image d'arrière-plan */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images.npm.webp" // <--- METTEZ À JOUR CE CHEMIN AVEC VOTRE NOUVELLE IMAGE
              alt="Background Image"
              fill
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
            />
          </div>

          {/* Overlay authentique (inchangé) */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-purple-900/60"></div>

          {/* Contenu principal (inchangé) */}
          <div className="relative z-10 container-pro">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Contenu authentique */}
              <div className="space-y-8 animate-fade-in-left">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20">
                    <Heart className="w-4 h-4 mr-2 text-red-400" />
                    <span className="text-sm font-medium">Créé par des passionnés de productivité</span>
                  </div>

                  <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Enfin une app de tâches qui{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      vous comprend
                    </span>
                  </h1>

                  <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                    Nous avons créé BoostTâche parce que nous étions frustrés par les apps compliquées. Simple, intuitive,
                    et vraiment utile - exactement ce dont vous avez besoin pour être productif sans stress.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl">
                      Commencer maintenant
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Voir comment ça marche
                  </Button>
                </div>

                {/* Statistiques authentiques */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">12,847</div>
                    <div className="text-sm text-white/70">Utilisateurs heureux</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">4.8/5</div>
                    <div className="text-sm text-white/70">Note moyenne</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">2 ans</div>
                    <div className="text-sm text-white/70">D'amélioration continue</div>
                  </div>
                </div>

                {/* Témoignage rapide */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div className="flex-1">
                      <p className="text-white/90 italic">
                        "Enfin une app qui ne me complique pas la vie ! J'ai essayé plein d'autres, mais BoostTâche est la
                        seule que j'utilise vraiment tous les jours."
                      </p>
                      <div className="mt-2 text-sm text-white/70">
                        <strong>Marie Dubois</strong> - Consultante freelance
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interface réelle */}
              <div className="relative animate-fade-in-right">
                <div className="relative mx-auto max-w-lg">
                  {/* Éléments décoratifs */}
                  <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-float-subtle"></div>
                  <div
                    className="absolute -bottom-8 -right-8 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-float-subtle"
                    style={{ animationDelay: "2s" }}
                  ></div>

                  {/* Interface authentique */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                    <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
                      {/* Header réaliste */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          BoostTâche - Mes tâches
                        </div>
                      </div>

                      {/* Tâches réalistes */}
                      <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border-l-4 border-blue-500">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-900 dark:text-white">
                                Préparer présentation client
                              </h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Aujourd'hui, 14h00</p>
                            </div>
                            <div className="w-5 h-5 border-2 border-blue-500 rounded-full"></div>
                          </div>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border-l-4 border-green-500">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-900 dark:text-white line-through opacity-60">
                                Faire les courses
                              </h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Terminé ce matin</p>
                            </div>
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border-l-4 border-orange-500">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-900 dark:text-white">Appeler maman</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Ce weekend</p>
                            </div>
                            <div className="w-5 h-5 border-2 border-orange-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Stats personnelles */}
                      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">8</div>
                          <div className="text-xs text-slate-500">Aujourd'hui</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">23</div>
                          <div className="text-xs text-slate-500">Cette semaine</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">89%</div>
                          <div className="text-xs text-slate-500">Réussite</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Notre Histoire (inchangée) */}
        <section id="story" className="section-pro bg-white dark:bg-slate-900">
          <div className="container-pro">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-fade-in-left">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
                    <Coffee className="w-4 h-4 mr-2" />
                    Notre histoire
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                    Tout a commencé par une frustration
                  </h2>
                  <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                    En 2022, nous étions comme vous : noyés dans les apps compliquées, les fonctionnalités inutiles, et
                    les interfaces confuses. Nous avons décidé de créer l'app que nous aurions aimé avoir.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">L'idée</h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        Une app de tâches qui ne vous fait pas perdre de temps à apprendre comment l'utiliser.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">La passion</h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        Chaque fonctionnalité est pensée avec amour pour vraiment vous aider au quotidien.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">La communauté</h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        Nos utilisateurs nous inspirent et nous aident à améliorer BoostTâche chaque jour.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative animate-fade-in-right">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">TF</span>
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white">L'équipe BoostTâche</h3>
                      <p className="text-slate-600 dark:text-slate-300">Une petite équipe passionnée basée à Libreville </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-blue-600">2</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Fondateurs</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-green-600">5</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Développeurs</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-purple-600">∞</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Cafés bus</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-orange-600">24/7</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Passion</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Témoignages Authentiques (inchangée) */}
        <section id="testimonials" className="section-pro bg-slate-50 dark:bg-slate-800">
          <div className="container-pro">
            <div className="text-center space-y-6 mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Ce que disent nos utilisateurs</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Leurs mots valent mieux que tous nos arguments commerciaux
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sophie Martin",
                  role: "Architecte freelance",
                  avatar: "S",
                  content:
                    "J'ai enfin trouvé une app qui ne me prend pas la tête. Simple, efficace, et elle fait exactement ce qu'elle promet. Mes projets sont mieux organisés depuis que j'utilise BoostTâche.",
                  rating: 5,
                },
                {
                  name: "Thomas Dubois",
                  role: "Chef de projet",
                  avatar: "T",
                  content:
                    "Après avoir testé une dizaine d'apps, BoostTâche est la seule que toute mon équipe utilise vraiment. L'interface est intuitive et on gagne un temps fou.",
                  rating: 5,
                },
                {
                  name: "Emma Rousseau",
                  role: "Étudiante en médecine",
                  avatar: "E",
                  content:
                    "Entre les cours, les stages et la vie perso, BoostTâche m'aide à tout gérer sans stress. Et en plus c's'est gratuit pour les étudiants !",
                  rating: 5,
                },
                {
                  name: "Pierre Leroy",
                  role: "Entrepreneur",
                  avatar: "P",
                  content:
                    "BoostTâche a transformé ma façon de travailler. Fini les post-it partout et les oublis importants. Tout est centralisé et accessible.",
                  rating: 5,
                },
                {
                  name: "Julie Chen",
                  role: "Designer UX",
                  avatar: "J",
                  content:
                    "En tant que designer, j'apprécie particulièrement l'attention portée aux détails. L'app est belle ET fonctionnelle.",
                  rating: 5,
                },
                {
                  name: "Marc Durand",
                  role: "Consultant IT",
                  avatar: "M",
                  content:
                    "La synchronisation entre mes appareils est parfaite. Je peux commencer une tâche sur mon ordi et la finir sur mon téléphone.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <Quote className="w-6 h-6 text-slate-400 mb-2" />
                  <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Fonctionnalités Simples (inchangée) */}
        <section id="features" className="section-pro bg-white dark:bg-slate-900">
          <div className="container-pro">
            <div className="text-center space-y-6 mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Tout ce dont vous avez besoin</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Pas de fonctionnalités gadget. Juste l'essentiel, fait parfaitement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: CheckCircle2,
                  title: "Création ultra-rapide",
                  description: "Ajoutez une tâche en 2 secondes. Pas de formulaires compliqués, juste l'essentiel.",
                },
                {
                  icon: Calendar,
                  title: "Dates intelligentes",
                  description: "Tapez 'demain' ou 'vendredi prochain' et BoostTâche comprend automatiquement.",
                },
                {
                  icon: Smartphone,
                  title: "Partout avec vous",
                  description: "Synchronisation instantanée entre tous vos appareils. Toujours à jour.",
                },
                {
                  icon: Users,
                  title: "Partage simple",
                  description: "Partagez vos listes avec famille et collègues en un clic.",
                },
                {
                  icon: Shield,
                  title: "Vos données protégées",
                  description: "Chiffrement de bout en bout. Vos tâches restent privées.",
                },
                {
                  icon: Zap,
                  title: "Rapide comme l'éclair",
                  description: "Interface optimisée pour la vitesse. Pas d'attente, pas de lag.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="text-center space-y-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto">
                    <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section CTA Authentique (inchangée) */}
        <section className="section-pro bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
          <div className="container-pro text-center">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
              <h2 className="text-5xl font-bold text-white">Prêt à simplifier votre vie ?</h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Rejoignez les milliers de personnes qui ont déjà adopté BoostTâche. Gratuit pour commencer, et vous pouvez
                annuler quand vous voulez.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-slate-100 font-semibold px-10 py-4 text-lg rounded-xl"
                  >
                    Commencer gratuitement
                    </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-10 py-4 text-lg rounded-xl"
                >
                  Voir une démo
                </Button>
              </div>

              <div className="pt-8 border-t border-white/20">
                <p className="text-white/80 text-sm">
                  ✓ Gratuit pour toujours ✓ Pas de carte bancaire ✓ Configuration en 30 secondes
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Authentique (inchangé) */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container-pro">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl">BoostTâche</span>
                  <span className="text-xs text-slate-400">Fait avec ❤️ à Libreville </span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">
                BoostTâche est né de notre frustration avec les apps compliquées. Notre mission : vous faire gagner du
                temps, pas en perdre.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-6">Produit</h3>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Télécharger
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6">Support</h3>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Communauté
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>© 2024 BoostTâche. Créé avec passion pour vous aider à être plus productif.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}