import TitleHeading from "@/components/title-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAllert } from "@/context/AllertContext";
import type { Genre } from "@/services/genre/genre.type";
import {
  movieCreateSchema,
  movieUpdateSchema,
  postMovies,
  updateMovie,
  type movieCreateValues,
  type movieUpdateValues,
} from "@/services/movie/movie.service";
import type { Movie } from "@/services/movie/movies";
import type { Theater } from "@/services/theater/theater.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { useMutation } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type LoaderData = {
  genres: Genre[];
  theaters: Theater[];
  detail: Movie;
};

const AdminMovieForm = () => {
  const { detail, genres, theaters } = useLoaderData() as LoaderData;

  const isUpdate = Boolean(detail);

  const form = useForm<movieCreateValues | movieUpdateValues>({
    resolver: zodResolver(isUpdate ? movieUpdateSchema : movieCreateSchema),
    defaultValues: {
      title: detail === null ? "" : detail?.title,
      // genre: detail?.genre?.map((g: any) => g._id) || "",
      genre: detail === null ? "" : detail?.genre?._id,
      theaters: detail === null ? [] : detail?.theaters?.map((t) => t._id),
      available: detail?.available || false,
      description: detail === null ? "" : detail.description,
      price: detail === null ? 0 : detail.price,
      bonus: detail === null ? "" : detail.bonus,
      thumbnail: null,
      video_trailer: null,
    },
  });

  const { setAllert } = useAllert();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: FormData) =>
      detail === null ? postMovies(data) : updateMovie(detail.slug, data),

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

      navigate("/admin/movies");
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

      navigate("/admin/movies");
    },
  });

  // form watch digunakan untuk mengambil data dari field theaters  untuk ditampilkan seperti fetching data
  const selectedTheaters = form.watch("theaters");

  const handleChangeTheater = (value: string) => {
    if (!selectedTheaters.includes(value)) {
      const newTheaters = [...selectedTheaters, value];

      form.setValue("theaters", newTheaters);
    }
  };

  const handleRemoveTheater = (value: string) => {
    const updatedTheaters = selectedTheaters.filter(
      (theater) => theater !== value
    );

    form.setValue("theaters", updatedTheaters);
  };

  const navigate = useNavigate();

  const onHandleSubmit = async (val: movieCreateValues | movieUpdateValues) => {
    try {
      const formData = new FormData();

      if (typeof val.available === "boolean") {
        formData.append("available", String(val.available));
      }

      formData.append("genre", val.genre);
      formData.append("theaters", val.theaters.join(","));
      formData.append("title", val.title);
      formData.append("price", val.price.toString());

      if (val.thumbnail) {
        formData.append("thumbnail", val.thumbnail);
      }

      if (val.video_trailer) {
        formData.append("video_trailer", val.video_trailer);
      }

      if (val.description) {
        formData.append("description", val.description);
      }

      if (val.bonus) {
        formData.append("bonus", val.bonus);
      }

      await mutateAsync(formData);

      navigate("/admin/movies");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-5">
      <Card className="overflow-hidden p-0 [box-shadow:20px_20px_5px_#00000082] w-1/2">
        <TitleHeading
          title={`${detail === null ? "Create" : "Update"} Data Movies`}
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title Movie</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Title Movie Name..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your Title Movie
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="p-2 md:p-4 lg:p-4">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Movie Thumbnail</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          placeholder="Enter Thumbnail Movie..."
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files) {
                              form.setValue("thumbnail", e.target.files[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your Thumbnail Movie
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="p-2 md:p-4 lg:p-4">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="video_trailer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Trailer Movie</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          placeholder="Enter Video Trailer Movie..."
                          accept="video/*"
                          onChange={(e) => {
                            if (e.target.files) {
                              form.setValue("video_trailer", e.target.files[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your Video Trailer Movie
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="p-2 md:p-4 lg:p-4">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        This is your Price Movie
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="p-2 md:p-4 lg:p-4">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Genre Movie"></SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genres.map((genre) => (
                              <SelectItem
                                key={`${genre._id}`}
                                value={genre._id}
                              >
                                {genre.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        This is your Genre Movie
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="p-2 md:p-4 lg:p-4">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="theaters"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Theaters</FormLabel>
                      <FormControl>
                        <Select onValueChange={handleChangeTheater}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Theater Movie"></SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {theaters.map((theater) => (
                              <SelectItem
                                key={`${theater._id}`}
                                value={theater._id}
                              >
                                {theater.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {selectedTheaters.length > 0 && (
                        <div className="inline-flex items-center space-x-2">
                          {selectedTheaters.map((theater, i) => (
                            <Badge
                              onClick={() => handleRemoveTheater(theater)}
                              key={`${theater + i}`}
                            >
                              {
                                theaters.find(
                                  (value: any) => value._id === theater
                                )?.name
                              }
                            </Badge>
                          ))}
                        </div>
                      )}
                      <FormDescription>
                        This is your Theaters Movie
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="p-2 md:p-4 lg:p-4">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description Movie</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Description Movie"
                          {...field}
                        ></Textarea>
                      </FormControl>
                      <FormDescription>
                        This is your Description Movie
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="p-2 md:p-4 lg:p-4">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="bonus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bonus Movie</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Bonus Movie"
                          {...field}
                        ></Textarea>
                      </FormControl>
                      <FormDescription>
                        This is your Bonus Movie
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="p-2 md:p-4 lg:p-4">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="available"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Movie</FormLabel>
                      <FormItem>
                        <FormControl>
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Showing Now</FormLabel>
                            </div>
                          </FormItem>
                        </FormControl>
                      </FormItem>
                      <FormDescription>
                        This is your Available Movie
                      </FormDescription>
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

export default AdminMovieForm;
