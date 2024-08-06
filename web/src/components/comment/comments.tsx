
import Comment from "./comment";
import useQueryComments from "@/hooks/use-query-comments";

const Comments = ({ postId }: { postId: string }) => {
  const { comments } = useQueryComments(postId);
  //const enableFilter = useStore($enableFilter);
  console.log(comments)
  
  return ( //at about 40 minutes in he explains how to filter comments
    <div className="">
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
};

export default Comments;
