"use client";
import { useAuth } from "@/components/AuthContext";
import { useState } from "react";
import styles from "./SignUpForm.module.css";
import Image from "next/image";

export default function SignUpForm({  setMode }) {
  const { supabase } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    (error) ? setError(error.message) : setMode("");
  };

  return (
      <div className={styles.formWrapper}>
        <div        style={{
          textAlign:"center"
        }}>
                    <Image
                      src="/images/logo.png"
                      alt="Logo"
                      width={100}
                      height={100}
                      priority
                    />
        </div>

        <h2 className={styles.title}>Inscription</h2>
        <form onSubmit={handleSignUp}>
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
              autoComplete="new-password"
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Créer un compte
          </button>
        </form>
  <a className={styles.link} onClick={() => setMode("signin")}>
    Déjà inscrit ? Connectez-vous
  </a>
      </div>
  );
}
