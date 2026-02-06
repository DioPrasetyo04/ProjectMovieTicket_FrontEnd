import type { BaseResponse } from "@/Types/BaseResponse";
import type { WalletTransaction } from "./wallet.type";
import { privateInstance } from "@/lib/config_backend";

export const getWalletTransactions = async (): Promise<
  BaseResponse<WalletTransaction[]>
> => privateInstance.get("/customer/topup-history").then((res) => res.data);
