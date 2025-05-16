"use client";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import styles from "./page.module.css";
import SignInForm from "@/components/SignUpForm";
import SignUpForm from "@/components/SignInForm";
import SignOutButton from "@/components/SignOutButton";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [mode, setMode] = useState();

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!user) {
        setMode("signin");
        return;
      }

      console.log("Chargement des recettes...");
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
        }}
      >
        <div
          style={{
            backgroundColor: "#0A0A0A",
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
        </div>

        {user && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                padding: "8px",
                alignItems: "center",
              }}
            >
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
              <SignOutButton onClick={() => setMode("signin")} />
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <p>Chargement des informations utilisateur...</p>;
  }

  if (mode === "signin") {
    return (
      <div className={styles.container}>
        <SignInForm setMode={setMode} />
      </div>
    );
  }

  if (mode === "signup") {
    return (
      <div className={styles.container}>
        <SignUpForm setMode={setMode} />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <h1>Bienvenue, {user?.email || "Visiteur"} !</h1>
        {user ? (
          <>
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
          </>
        ) : null}
      </div>
    </>
  );
}
