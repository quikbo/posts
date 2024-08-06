import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { $router } from "@/lib/router";
import { $enableFilter, setEnableFilter } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

const Header = () => {
  //const [enableFilter, setEnableFilter] = useState<boolean>(false);
  const enableFilter = useStore($enableFilter);


  const [label, setLabel] = useState<string>("Posts");
  const page = useStore($router);
  const { user } = useAuth();
  const showUserFilter = user && user.username;

  useEffect(() => {
    if (page && page.route === "post") {
      setLabel("Comments");
    } else {
      setLabel("Posts");
    }
  }, [page]);

  useEffect(() => {
    //console.log(enableFilter);
  }, [enableFilter]);

  if (!page) return null;

  return (
    <div className="flex justify-center gap-3 p-1 border-b">
      {showUserFilter && (
        <Button
          variant={"link"}
          onClick={() => setEnableFilter(true)}
        >
          {`My ${label}`}
        </Button>
      )}
      <Button
        variant={"link"}
        disabled={!showUserFilter}
        onClick={() => setEnableFilter(false)}
      >
        {`All ${label}`}
      </Button>
    </div>
  );
};

export default Header;
