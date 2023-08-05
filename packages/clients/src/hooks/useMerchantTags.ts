import { MerchantClient } from "../clients/MerchantClient";
import { ApiResponse, Tag , ApiProps, MerchantProps } from "@nofrixion/utils/types";
import { useQuery } from "@tanstack/react-query";

const fetchMerchantTags = async (
  apiUrl: string,
  merchantId?: string,
  authToken?: string,
): Promise<ApiResponse<Tag[]>> => {
  const client = new MerchantClient({ apiUrl, authToken });
  const response = await client.getTags({ merchantId });

  return response;
};

export const useMerchantTags = ({ merchantId }: MerchantProps, { apiUrl, authToken }: ApiProps) => {
  const QUERY_KEY = ["MerchantTags", merchantId, apiUrl, authToken];

  return useQuery<ApiResponse<Tag[]>, Error>(QUERY_KEY, () => fetchMerchantTags(apiUrl, merchantId, authToken), {
    enabled: !!merchantId,
  });
};
