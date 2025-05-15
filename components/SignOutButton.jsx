"use client";
import Image from "next/image";
import { useAuth } from "@/components/AuthContext";

export default function SignOutButton() {
  const { supabase } = useAuth();

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  return (
    <>
      {supabase && (
        <Image
          onClick={handleSignOut}
          src="/images/icons8-sortie-50.png"
          alt="Sortie"
          width={50}
          height={50}
          style={{ cursor: "pointer" }}
        />
      )}
    </>
  );
}
