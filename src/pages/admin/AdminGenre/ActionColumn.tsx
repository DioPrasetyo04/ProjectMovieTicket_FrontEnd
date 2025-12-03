import Allert from "@/components/ui/Allert";
import { Button } from "@/components/ui/button";
import { useAllert } from "@/context/AllertContext";
import { deleteGenre } from "@/services/genre/genre.service";
import type { ActionColumnProps } from "@/Types/ActionColumn";
import { useMutation } from "@tanstack/react-query";
import { CircleX, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { Link, useRevalidator } from "react-router-dom";
import { toast } from "sonner";

const ActionColumn = ({ slug }: ActionColumnProps) => {
  const { setAllert } = useAllert();
  const [confirmationDelete, setConfirmationDelete] = useState(false);
  const revalidator = useRevalidator();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => deleteGenre(slug),
    onSuccess: (data) => {
      const status = (data.status || "Success") as
        | "Success"
        | "Error"
        | "Failed"
        | "Info";
      const message = data.message || "Genre deleted successfully";

      toast.success(message);

      setAllert({
        open: true,
        status,
        message,
      });

      sessionStorage.setItem(
        "alert-data",
        JSON.stringify({
          open: true,
          status,
          message,
        })
      );

      revalidator.revalidate();
    },
  });

  const handleDelete = async () => {
    try {
      await mutateAsync();
      setConfirmationDelete(false);
    } catch (error) {
      toast.error("Genre data failed deleted, something went wrong");
    }
  };

  return (
    <div className="inline-flex items-center gap-4 p-5">
      {confirmationDelete && (
        <Allert
          status="Info"
          message="Are You Sure Delete This Data?"
          button
          modificationButton="w-[120px] h-[80px] flex items-center justify-center gap-2"
          childrenButton={
            <div className="flex gap-3">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => setConfirmationDelete(false)}
              >
                <CircleX className="w-4 h-4 mr-1" /> Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={handleDelete}
              >
                <Trash className="w-4 h-4 mr-1" /> Delete
              </Button>
            </div>
          }
        />
      )}

      <Button size="sm" variant="secondary" asChild>
        <Link to={`/admin/genre/edit/${slug}`}>
          <Edit className="w-4 h-4" /> Edit
        </Link>
      </Button>

      <Button
        isLoading={isPending}
        onClick={() => setConfirmationDelete(true)}
        size="sm"
        variant="destructive"
      >
        <Trash className="w-4 h-4 text-white" /> Delete
      </Button>
    </div>
  );
};

export default ActionColumn;
