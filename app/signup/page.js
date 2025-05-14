"use client";
import { useAuth } from "@/components/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthLink from "@/components/AuthLink";
import styles from "./SignUpPage.module.css";

export default function SignUpPage() {
  const { user, supabase } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSignUp = async e => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Inscription</h2>
        <form onSubmit={handleSignUp}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email :
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={styles.input}
              autoComplete="email"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Mot de passe :
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className={styles.input}
              autoComplete="current-password" /* "new-password" pour le signup */
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Créer un compte
          </button>
        </form>
        <AuthLink
          href="/signin"
          text="Déjà inscrit ? Connectez-vous"
          className={styles.authLink}
        />
      </div>
    </div>
  );
}
