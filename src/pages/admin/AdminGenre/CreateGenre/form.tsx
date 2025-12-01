import TitleHeading from "@/components/title-heading";
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
import { genreSchema, type GenreValues } from "@/services/genre/genre.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

const AdminGenreForm = () => {
  const form = useForm<GenreValues>({
    resolver: zodResolver(genreSchema) as any,
    defaultValues: {
      name: "",
    },
  });

  const onHandleSubmit = (data: GenreValues) => {
    console.log(data);
  };
  return (
    <div className="p-5">
      <Card className="overflow-hidden p-0 [box-shadow:20px_20px_5px_#00000082] w-1/2">
        <TitleHeading title="Create Data Genre"></TitleHeading>
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
                          placeholder="Enter email..."
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
              <button className="flex justify-center items-center bg-green-500 font-semibold gap-x-3 gap-y-2 px-3 py-2 rounded-full">
                <Save className="w-6 h-6"></Save>
                Submit
              </button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AdminGenreForm;
