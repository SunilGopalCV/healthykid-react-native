import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check the initial auth state
    const fetchUser = async () => {
      setIsLoading(true);
      const { data: session, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        setIsLoggedIn(false);
        setUser(null);
      } else {
        const currentUser = session?.user || null;
        setIsLoggedIn(!!currentUser);
        setUser(currentUser);
      }

      setIsLoading(false);
    };

    fetchUser();

    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Auth event: ${event}`);
        const currentUser = session?.user || null;
        setIsLoggedIn(!!currentUser);
        setUser(currentUser);
      }
    );

    // Cleanup subscription
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        isLoading,
        signOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
