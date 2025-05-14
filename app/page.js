"use client";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation"; // Importation de useRouter
import { useEffect } from "react";
import SignOutButton from "@/components/SignOutButton";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter(); // Initialisation du routeur

  useEffect(() => {
    // Si l'utilisateur est déconnecté, rediriger vers la page de connexion
    if (!loading && !user) {
      router.push("/signin"); // Redirection vers la page de connexion
    }
  }, [user, loading, router]); // Le hook dépend de user et loading

  if (loading) {
    return <p>Chargement des informations utilisateur...</p>;
  }

  if (!user) {
    return <p>Redirection vers la page de connexion...</p>;
  }

  return (
    <div>
      <h1>Bienvenue, {user.email} !</h1>
      <SignOutButton />
    </div>
  );
}
