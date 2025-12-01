import { useState, type JSX } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { FaCheckCircle } from "react-icons/fa";
import { MdError, MdSmsFailed } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";

export type AllertProps = {
  status: "Success" | "Error" | "Failed" | "Info";
  message?: string;
  title?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "success" | "error" | "failed" | "info";
  size?: "default" | "sm" | "lg";
  onClose?: () => void;
};

const cardAlertVariants = cva(
  "card w-full border rounded-lg backdrop-blur-md transition-all",
  {
    variants: {
      variant: {
        default: "bg-white border-white text-black",
        success: "bg-white border-white text-green-600",
        error: "bg-white border-white text-red-600",
        failed: "bg-white border-white text-yellow-600",
        info: "bg-white border-white text-blue-600",
      },
      size: {
        default: "p-2 md:p-4 lg:p-4 max-w-full md:max-w-md lg:max-w-lg",
        sm: "p-2 md:p-3 lg:p-3 max-w-[100px] md:max-w-sm lg:max-w-md",
        lg: "p-2 md:p-4 lg:p-4 max-w-[120px] md:max-w-md lg:max-w-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Allert = ({
  status,
  message,
  className,
  variant,
  size,
  onClose,
}: AllertProps) => {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const getIcon = (status: string) => {
    switch (status) {
      case "Success":
        return <FaCheckCircle className="text-green-600 text-[50px]" />;
      case "Error":
        return <MdError className="text-red-600 text-[50px]" />;
      case "Failed":
        return <MdSmsFailed className="text-yellow-600 text-[50px]" />;
      default:
        return <FaCircleInfo className="text-blue-600 text-[50px]" />;
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
      <div className={cn(cardAlertVariants({ variant, size, className }))}>
        <div className="flex flex-col justify-center items-center gap-y-2 p-3">
          <div className="h-[50px] w-[50px] mb-2 flex justify-center items-center">
            {getIcon(status)}
          </div>
          <div className="text-center gap-y-5 flex flex-col items-center justify-center">
            <h2
              className={cn(
                "text-lg font-semibold",
                status === "Success" && "text-green-600",
                status === "Error" && "text-red-600",
                status === "Failed" && "text-yellow-600",
                status === "Info" && "text-blue-600"
              )}
            >
              {status}
            </h2>
            <p
              className={cn(
                "text-md font-bold",
                status === "Success" && "text-green-600",
                status === "Error" && "text-red-600",
                status === "Failed" && "text-yellow-600",
                status === "Info" && "text-blue-600"
              )}
            >
              {message}
            </p>
            <Button
              onClick={handleClose}
              type="button"
              className={cn(
                status === "Success" && "bg-green-600",
                status === "Error" && "bg-red-600",
                status === "Failed" && "bg-yellow-600",
                status === "Info" && "bg-blue-600"
              )}
            >
              Ok, Got it!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allert;
