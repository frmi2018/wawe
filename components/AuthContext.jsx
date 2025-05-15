"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      console.log("Fetching session...");

      const { data, error } = await supabase.auth.getSession();
      console.log("Session data:", data);

      if (error) {
        console.error("Error fetching session:", error.message);
      }

      setUser(data.session?.user || null);
      setLoading(false);

      if (data.session?.user) {
        console.log("User found, redirecting to /");
        router.push("/");
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);

      setUser(session?.user || null);

      if (event === "SIGNED_IN") {
        console.log("User signed in, redirecting to /");
        router.push("/");
      }

      if (event === "SIGNED_OUT") {
        console.log("User signed out, redirecting to /signin");
        router.push("/");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, supabase }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
