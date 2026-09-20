import { useEffect, useState } from "react";
import { getCurrentUser, onAuthStateChange, signIn, signUp, signOut } from "../services/auth";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser);

    const { data: subscription } = onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  return { user, signIn, signUp, signOut };
}
