import Post from "./post";
import useQueryPosts from "@/hooks/use-query-posts";
import InfiniteScroll from "@/components/shared/infinite-scroll";
import { useStore } from "@nanostores/react";
import { $currentPage, $enableFilter, $hasMorePosts } from "@/lib/store";

const Posts = () => {
  const currentPage = useStore($currentPage);
  const hasMorePosts = useStore($hasMorePosts);
  const { posts, loadPosts, isLoading } = useQueryPosts();
  const enableFilter = useStore($enableFilter);

  const loadMorePosts = () => {
    loadPosts(currentPage + 1);
  };

  return (
    <div className="space-y-4">
      <InfiniteScroll
        loadMore={loadMorePosts}
        hasMore={hasMorePosts}
        isLoading={isLoading}
        key={enableFilter ? "filtered" : "all"}
      >
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
