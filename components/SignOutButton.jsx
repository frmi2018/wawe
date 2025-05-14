"use client";
import { useAuth } from "@/components/AuthContext";

export default function SignOutButton() {
  const { supabase } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return <button onClick={handleSignOut}>Se déconnecter</button>;
}