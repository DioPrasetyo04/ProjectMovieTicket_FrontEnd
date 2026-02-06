export interface WalletTransaction {
  _id: string;
  wallet_id: string;
  price: number;
  status: string;
}

export interface WalletTopUp {
  token: string;
  redirect_url: string;
}

