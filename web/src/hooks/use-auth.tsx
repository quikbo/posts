import { toast } from "@/components/ui/use-toast";
import { signIn, signOut, signUp } from "@/data/api";
import { $user, clearUser, setUser } from "@/lib/store";
import { useStore } from "@nanostores/react";

function useAuth() {
  const user = useStore($user);

  const login = async (username: string, password: string) => {
    try {
      const user = await signIn(username, password);
      setUser(user);
    } catch (err) {
      const errorMessage = (err as Error).message ?? "Please try again!";
      toast({
        variant: "destructive",
        title: "Sorry! There was an error signing in!",
        description: errorMessage,
      });
    }
  };

  const register = async (name: string, username: string, password: string) => {
    try {
      const user = await signUp(name, username, password);
      setUser(user);
    } catch (err) {
      const errorMessage = (err as Error).message ?? "Please try again!";
      toast({
        variant: "destructive",
        title: "Sorry! There was an error registering!",
        description: errorMessage,
      });
    }
  };

  const logout = async () => {
    try {
      const success = await signOut();
      success && clearUser();
    } catch (err) {
      const errorMessage = (err as Error).message ?? "Please try again!";
      toast({
        variant: "destructive",
        title: "Sorry! There was an error signing out!",
        description: errorMessage,
      });
    }
  };

  return { user, login, register, logout };
}

export default useAuth;
