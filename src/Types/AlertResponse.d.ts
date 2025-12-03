export type AllertType = {
  open: boolean;
  status: "Success" | "Error" | "Failed" | "Info";
  message: string;
};

export type AllertContextType = {
  allert: AllertType;
  setAllert: (allertData: AllertType) => void;
};
