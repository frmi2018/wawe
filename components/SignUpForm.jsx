"use client";
import { useAuth } from "@/components/AuthContext";
import { useState } from "react";
import styles from "./SignInForm.module.css";

export default function SignInForm({ setMode }) {
  const { supabase } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

   (error) ? setError(error.message) : setMode("");
  };

  return (
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Connexion</h2>
        <form onSubmit={handleSignIn}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email :
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              autoComplete="current-password"
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Se connecter
          </button>
        </form>
      </div>
  );
}
