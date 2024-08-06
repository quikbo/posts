import { useEffect, useState } from "react";
import { fetchPosts } from "@/data/api";
import { useStore } from "@nanostores/react";
import {
  $enableFilter,
  $posts,
  appendPosts,
  incrementPage,
  setHasMorePosts,
  setPosts,
} from "@/lib/store";
import { toast } from "@/components/ui/use-toast";
import useAuth from "./use-auth";

function useQueryPosts() {
  const posts = useStore($posts);
  const [isLoading, setIsLoading] = useState(false);
  const enableFilter = useStore($enableFilter);
  const { user } = useAuth();

  const loadPosts = async (page: number = 1, limit: number = 20) => {
    setIsLoading(true);
    try {
      const { data: fetchedPosts, total } = await fetchPosts(page, limit, 
        enableFilter ? user.username : undefined,
      );
      setHasMorePosts(posts.length + fetchedPosts.length < total);
      if (page === 1) {
        setPosts(fetchedPosts);
      } else {
        appendPosts(fetchedPosts);
        incrementPage();
      }
    } catch (error) {
      const errorMessage =
        (error as Error).message ?? "Please try again later!";
      toast({
        variant: "destructive",
        title: "Sorry! There was an error reading the posts 🙁",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableFilter]);

  return { posts, loadPosts, isLoading };
}

export default useQueryPosts;
