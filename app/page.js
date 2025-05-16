"use client";
import { useAuth } from "@/components/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import styles from "./page.module.css";
import SignInForm from "@/components/SignInForm"; // attention, tu avais inversé SignInForm et SignUpForm dans ton import
import SignUpForm from "@/components/SignUpForm";
import SignOutButton from "@/components/SignOutButton";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const { user, loading } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [mode, setMode] = useState("signin"); // "signin" ou "signup"

  useEffect(() => {
    if (!user) {
      setRecipes([]);
      return;
    }

    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Erreur lors du chargement des recettes :", error);
      } else {
        setRecipes(data);
      }
    };

    fetchRecipes();
  }, [user]);

  const NavBar = () => {
    if (loading) return null;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0A",
          padding: "8px",
        }}
      >
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        {user ? (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href="/">
              <Image
                src="/images/icons8-caddie-50.png"
                alt="Caddie"
                width={50}
                height={50}
              />
            </Link>
            <Link href="/">
              <Image
                src="/images/icons8-utilisateur-48.png"
                alt="Utilisateur"
                width={50}
                height={50}
              />
            </Link>
            <SignOutButton />
          </div>
        ) : null}
      </div>
    );
  };

  if (loading) {
    return <p>Chargement des informations utilisateur...</p>;
  }

  if (!user) {
    return (
      <div className={styles.container}>
        {mode === "signin" ? (
          <SignInForm setMode={setMode} />
        ) : (
          <SignUpForm setMode={setMode} />
        )}
      </div>
    );
  }

  // Si user connecté, afficher recettes + déconnexion
  return (
    <>
      {/* <div style={{ padding: "10px" }}>
        <SignOutButton />
      </div> */}

      <NavBar />

      <div className={styles.container}>
        <h1>Bienvenue, {user.email} !</h1>
        <h2>Vos recettes :</h2>
        {recipes.length > 0 ? (
          <ul>
            {recipes.map(recipe => (
              <li key={recipe.id}>{recipe.nom}</li>
            ))}
          </ul>
        ) : (
          <p>Aucune recette disponible.</p>
        )}
      </div>
    </>
  );
}
