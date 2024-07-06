import { defaultHuddlersUrl, HuddlersEndpoints } from './constants';
import { CacheRecordResponse } from './types';

export type CacheInfoParams = {
  cacheId: string;
  /**
   * Defaults to 'https://api.huddlers.dev'. If you use a different service that is built on Huddlers, you can pass the URL here.
   */
  url?: string;
};

export const fetchCacheInfo = async (
  params: CacheInfoParams,
): Promise<CacheRecordResponse> => {
  const cacheId = params.cacheId;
  const url = params.url || defaultHuddlersUrl;
  const fetchResponse = await fetch(
    `${url}${HuddlersEndpoints.CacheInfo}?cache_id=${cacheId}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const response = (await fetchResponse.json()) as CacheRecordResponse;
  return response;
};
