import { Button } from "@/components/ui/button";
import { PostType } from "@/data/types";
import { Pencil2Icon, ChatBubbleIcon } from "@radix-ui/react-icons";
import DeletePostDialog from "./delete-post-dialog";
import { openPage } from "@nanostores/router";
import { $router } from "@/lib/router";
import useAuth from "@/hooks/use-auth";
import { toast } from "../ui/use-toast";


const PostActions = ({
  post,
  setIsEditing,
}: {
  post: PostType;
  setIsEditing: (flag: boolean) => void;
}) => {
  const { user } = useAuth();
  const showAction = user && user.id === post.author.id.toString();

  const navigateToCommentsView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    authGuard() &&  openPage($router, "post", { postId: post.id });
  };

  const authGuard = () => {
    if (user && user.username) return true;

    toast({
      variant: "destructive",
      title: "Sorry! You need to be signed in to do that 🙁",
      description: "Please sign in or create an account to continue",
    });

    return false;
  }

  return (
    <div className="flex justify-end">
      <Button variant={"ghost"} size={"icon"} onClick={navigateToCommentsView}>
        <ChatBubbleIcon className="w-4 h-4" />
      </Button>
      {showAction && (
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setIsEditing(true)}
        >
          <Pencil2Icon className="w-4 h-4" />
        </Button>
      )}
      {showAction && <DeletePostDialog postId={post.id} />}
    </div>
  );
};

export default PostActions;
