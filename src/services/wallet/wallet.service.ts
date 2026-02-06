import type { BaseResponse } from "@/Types/BaseResponse";
import type { WalletTopUp, WalletTransaction } from "./wallet.type";
import { privateInstance } from "@/lib/config_backend";

export const getWalletTransactions = async (): Promise<
  BaseResponse<WalletTransaction[]>
> => privateInstance.get("/customer/topup-history").then((res) => res.data);

export const topupWallet = async (data: {
  balance: number;
}): Promise<WalletTopUp> =>
  privateInstance.post("/customer/topup", data).then((res) => res.data.data);
