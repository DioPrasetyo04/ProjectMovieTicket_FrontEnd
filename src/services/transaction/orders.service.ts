import type { BaseResponse } from "@/Types/BaseResponse";
import type { Orders } from "./orders.type";
import { privateInstance } from "@/lib/config_backend";

export const getOrders = async (): Promise<BaseResponse<Orders[]>> =>
  privateInstance.get("/customer/orders").then((res) => res.data);
