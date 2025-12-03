import type { AllertType, AllertContextType } from "@/Types/AlertResponse";
import { createContext, useContext, useState } from "react";

const AllertContext = createContext<AllertContextType | undefined>(undefined);

export const AllertProvider = ({ children }: { children: React.ReactNode }) => {
  const [allert, setAllert] = useState<AllertType>({
    open: false,
    status: "Success",
    message: "",
  });

  return (
    <AllertContext.Provider value={{ allert, setAllert }}>
      {children}
    </AllertContext.Provider>
  );
};

export const useAllert = () => {
  const contextAlert = useContext(AllertContext);

  if (!contextAlert) {
    throw new Error("useAllert must be used within a AllertProvider");
  }
  return contextAlert;
};
