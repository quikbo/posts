import { useEffect, useState } from "react";
import { fetchComments } from "@/data/api";
import { useStore } from "@nanostores/react";
import { setComments, $comments, $enableFilter } from "@/lib/store";
import { toast } from "@/components/ui/use-toast";
import useAuth from "./use-auth";

function useQueryComments(postId: string) {
  const comments = useStore($comments);
  const [isLoading, setIsLoading] = useState(false);
  const enableFilter = useStore($enableFilter);
  const { user } = useAuth();


  const loadComments = async (page: number = 1, limit: number = 20) => {
    setIsLoading(true);
    try {
      const fetchedComments = await fetchComments(postId, page, limit, enableFilter ? user.username : undefined);
      setComments([...fetchedComments]);
    } catch (error) {
      const errorMessage =
        (error as Error).message ?? "Please try again later!";
      toast({
        variant: "destructive",
        title: "Sorry! There was an error reading the comments 🙁",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, enableFilter]);

  return { comments, isLoading, loadComments };
}

export default useQueryComments;
