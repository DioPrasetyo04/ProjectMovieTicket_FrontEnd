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
  postTheater,
  theaterSchema,
  updateTheater,
  type theaterValues,
} from "@/services/theater/theater.service";
import type { Theater } from "@/services/theater/theater.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminTheaterForm = () => {
  const { setAllert } = useAllert();

  const detailTheater = useLoaderData() as Theater;

  const form = useForm<theaterValues>({
    resolver: zodResolver(theaterSchema) as any,
    defaultValues: {
      name: detailTheater?.name || "",
      city: detailTheater?.city || "",
      address: detailTheater?.address || "",
      layout: {
        total_rows: detailTheater?.layout.total_rows || 0,
        seat_per_row: detailTheater?.layout.seat_per_row || 0,
      },
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: theaterValues) =>
      detailTheater === undefined
        ? postTheater(data)
        : updateTheater(detailTheater.slug, data),
    onSuccess: (data) => {
      const status = (data.status || "Success") as
        | "Success"
        | "Error"
        | "Failed"
        | "Info";
      const message = data.message || "Theater data successfully created";

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

      navigate("/admin/theaters");
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

      navigate("/admin/theaters");
    },
  });

  const navigate = useNavigate();

  const onHandleSubmit = async (data: theaterValues) => {
    try {
      await mutateAsync(data);
      navigate("/admin/theaters");
    } catch (error) {
      toast.error("Theater data failed, something went wrong");
    }
  };
  return (
    <div className="p-5">
      <Card className="overflow-hidden p-0 [box-shadow:20px_20px_5px_#00000082] w-1/2">
        <TitleHeading
          title={`${
            detailTheater === undefined ? "Create" : "Update"
          } Data Theater`}
        ></TitleHeading>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onHandleSubmit)}
            className="space-y-2 w-full gap-5"
          >
            <div className="p-2 md:p-4 lg:p-4 gap-8">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Theater Name..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your Theater Name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Theater City Location..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your Theater City Location
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Theater Address Location..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your Theater Address Location
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="layout.total_rows"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Rows Theater</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter Theater Total Rows Theater..."
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        This is your total rows theater to calculation seat
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="layout.seat_per_row"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seat Per Row Theater</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter Theater Seat Per Row Theater..."
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        This is your seat per row theater to calculation seat
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

export default AdminTheaterForm;
