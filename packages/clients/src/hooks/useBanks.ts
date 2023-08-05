import { MerchantClient } from "../clients/MerchantClient";
import { ApiResponse, MerchantBankSettings , ApiProps, MerchantProps } from "@nofrixion/utils/types";
import { useQuery } from "@tanstack/react-query";

const fetchBanks = async (
  apiUrl: string,
  merchantId?: string,
  authToken?: string,
): Promise<ApiResponse<MerchantBankSettings>> => {
  const client = new MerchantClient({ apiUrl, authToken });

  const response = await client.getBankSettings({ merchantId });

  return response;
};

export const useBanks = ({ merchantId }: MerchantProps, { apiUrl, authToken }: ApiProps) => {
  const QUERY_KEY = ["Banks", merchantId, apiUrl, authToken];

  return useQuery<ApiResponse<MerchantBankSettings>, Error>(
    QUERY_KEY,
    () => fetchBanks(apiUrl, merchantId, authToken),
    {
      enabled: !!merchantId,
    },
  );
};
