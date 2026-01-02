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
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useAllert } from "@/context/AllertContext";
import {
  postCustomer,
  updateCustomer,
  UserCreateSchema,
  UserUpdateSchema,
  type userCreateValue,
  type userUpdateValue,
} from "@/services/customers/customer.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeClosed, EyeIcon, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminCustomerForm = () => {
  const detailCustomer = useLoaderData();

  const navigate = useNavigate();

  const { setAllert } = useAllert();

  const isCreate = !detailCustomer;

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<userCreateValue | userUpdateValue>({
    resolver: zodResolver(
      isCreate ? UserCreateSchema : UserUpdateSchema
    ) as any,
    defaultValues: {
      name: detailCustomer?.name ?? "",
      email: detailCustomer?.email ?? "",
      password: detailCustomer?.password ?? "",
      photo: null,
      role: detailCustomer?.role ?? "customer",
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: FormData) =>
      !detailCustomer
        ? postCustomer(data)
        : updateCustomer(detailCustomer.email, data),

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

      navigate("/admin/customers");
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

      navigate("/admin/customers");
    },
  });

  const onHandleSubmit = async (data: userCreateValue | userUpdateValue) => {
    try {
      const formData = new FormData();
      if (data.name) {
        formData.append("name", data.name);
      }

      if (data.email) {
        formData.append("email", data.email);
      }

      if (data.password) {
        formData.append("password", data.password);
      }

      if (data.role) {
        formData.append("role", data.role);
      }

      if (data.photo instanceof File) {
        formData.append("photo", data.photo);
      }

      await mutateAsync(formData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-5">
      <Card className="overflow-hidden p-0 [box-shadow:20px_20px_5px_#00000082] w-1/2">
        <TitleHeading
          title={`${!detailCustomer ? "Create" : "Update"} Data Users`}
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
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter User Name..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>This is your Name</FormDescription>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter Email Name..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>This is your Email</FormDescription>
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="flex relative items-center justify-end">
                        <FormControl>
                          <Input
                            type={`${showPassword ? "text" : "password"}`}
                            placeholder="Enter Password..."
                            {...field}
                          />
                        </FormControl>
                        {showPassword ? (
                          <button
                            className="absolute right-4"
                            onClick={() => setShowPassword(false)}
                          >
                            <EyeIcon className="h-5 w-5 cursor-pointer bg-orange-500 rounded-lg text-white"></EyeIcon>
                          </button>
                        ) : (
                          <button
                            className="absolute right-4"
                            onClick={() => setShowPassword(true)}
                          >
                            <EyeClosed className="h-5 w-5 cursor-pointer bg-orange-500 rounded-lg text-white"></EyeClosed>
                          </button>
                        )}
                      </div>
                      <FormDescription>This is your password</FormDescription>
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
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo Users</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          placeholder="Enter Photo User..."
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files) {
                              form.setValue("photo", e.target.files[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>This is your Photo User</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {detailCustomer && (
              <div className="p-2 md:p-4 lg:p-4">
                <div className="flex flex-col gap-2">
                  <FormLabel>Role</FormLabel>
                  <NativeSelect
                    aria-invalid="true"
                    {...form.register("role")}
                    name="role"
                  >
                    <NativeSelectOption value="">
                      Select role
                    </NativeSelectOption>
                    <NativeSelectOption value="admin">Admin</NativeSelectOption>
                    <NativeSelectOption value="customer">
                      Customer
                    </NativeSelectOption>
                  </NativeSelect>
                </div>
              </div>
            )}
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

export default AdminCustomerForm;
