import TitleHeading from "@/components/title-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAllert } from "@/context/AllertContext";
import {
  genreSchema,
  postGenres,
  updateGenre,
  type GenreValues,
} from "@/services/genre/genre.service";
import type { Genre } from "@/services/genre/genre.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminGenreForm = () => {
  const detailGenre = useLoaderData() as Genre;

  const form = useForm<GenreValues>({
    resolver: zodResolver(genreSchema) as any,
    defaultValues: {
      name: detailGenre?.name || "",
    },
  });

  const { setAllert } = useAllert();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: GenreValues) =>
      detailGenre === undefined
        ? postGenres(data)
        : updateGenre(detailGenre.slug, data),

    onSuccess: (data) => {
      const status = (data.status || "Success") as
        | "Success"
        | "Error"
        | "Failed"
        | "Info";
      const message = data.message || "Genre data successfully created";

      toast.success(message);

      setAllert({
        open: true,
        status: status,
        message: message,
      });

      sessionStorage.setItem(
        "alert-data",
        JSON.stringify({
          open: true,
          status: status,
          message: message,
        })
      );

      form.reset();

      navigate("/admin/genres");
    },

    onError: (error: any) => {
      const status = error?.response?.info;
      const message = error?.response?.data?.message;

      toast.error(message);

      let statusType: "Error" | "Failed" | "Info";
      if (status === 404 || status === 401) {
        statusType = "Info";
      } else if (status === 400) {
        statusType = "Failed";
      } else {
        statusType = "Error";
      }

      setAllert({
        open: true,
        status: statusType,
        message: message,
      });

      sessionStorage.setItem(
        "alert-data",
        JSON.stringify({
          open: true,
          status: statusType,
          message: message,
        })
      );

      setAllert({
        open: true,
        status: statusType,
        message: message,
      });

      navigate("/admin/genres");
    },
  });

  const navigate = useNavigate();

  const onHandleSubmit = async (data: GenreValues) => {
    // console.log(data);
    try {
      await mutateAsync(data);
    } catch (error) {
      // console.error(error);
      toast.error("Genre data failed created, something went wrong");
    }
  };
  return (
    <div className="p-5">
      <Card className="overflow-hidden p-0 [box-shadow:20px_20px_5px_#00000082] w-1/2">
        <TitleHeading
          title={`${
            detailGenre === undefined ? "Create" : "Update"
          } Data Genre`}
        ></TitleHeading>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onHandleSubmit)}
            className="space-y-2 w-full"
          >
            <div className="p-2 md:p-4 lg:p-4">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Genre Name..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>This is your Genre Name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="p-2">
              <Button
                className="flex justify-center items-center bg-green-500 font-semibold gap-x-3 gap-y-2 px-3 py-2 rounded-full"
                isLoading={isPending}
              >
                <Save className="w-6 h-6"></Save>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AdminGenreForm;
